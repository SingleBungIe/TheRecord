package com.record.the_record.user.service;

import com.record.the_record.aop.exception.customexceptions.*;
import com.record.the_record.email.service.EmailService;
import com.record.the_record.entity.*;
import com.record.the_record.entity.enums.TrueAndFalse;
import com.record.the_record.entity.enums.UserRole;
import com.record.the_record.folder.repository.FolderRepository;
import com.record.the_record.s3.dto.FileDetailDto;
import com.record.the_record.s3.service.AmazonS3Service;
import com.record.the_record.security.JwtTokenProvider;
import com.record.the_record.user.dto.*;
import com.record.the_record.user.repository.NeighborRepository;
import com.record.the_record.user.repository.UserRepository;
import com.record.the_record.user.repository.UserVerificationRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final NeighborRepository neighborRepository;
    private final FolderRepository folderRepository;
    private final UserVerificationRepository userVerificationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private final EmailService emailService;
    private final AmazonS3Service amazonS3Service;

    @Override
    @Transactional
    public String login(UserDto userDto) {
        Optional<User> user = userRepository.findByUserId(userDto.getUserId());

        if (user.isPresent()) {
            if (!passwordEncoder.matches(userDto.getPassword(), user.get().getPassword())) {
                throw new NoUserException();
            }
            String accessToken = jwtTokenProvider.createAccessToken(user.get().getPk(), user.get().getUserId(), user.get().getUserRole().name());
            String refreshToken = jwtTokenProvider.createAccessToken(user.get().getPk(), user.get().getUserId(), user.get().getUserRole().name());

            return accessToken;
        } else
            throw new NoUserException();
    }

    @Override
    @Transactional
    public Long currentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return user.getPk();
    }

    @Override
    @Transactional
    public void addUser(UserDto userDto) {

        Optional<UserVerification> optionalUserVerification = userVerificationRepository.findById(userDto.getEmail());

        optionalUserVerification.ifPresent(userVerification -> {

            checkVerificationCode(CertificateDto.builder()
                    .certificateNum(userDto.getCertificateNum())
                    .userEmail(userDto.getEmail())
                    .build());

            User user = User.builder()
                    .userId(userDto.getUserId())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .name(userDto.getName())
                    .email(userDto.getEmail())
                    .profile("default.png")
                    .roomIsOpen(TrueAndFalse.FALSE)
                    .introduce("자기소개가 아직 없습니다.")
                    .userRole(UserRole.valueOf("ROLE_USER")).build();

            folderRepository.save(Folder.builder()
                    .user(user)
                    .name("기본 폴더").build());
            userRepository.save(user);
            userVerificationRepository.delete(userVerification);
        });

        optionalUserVerification.orElseThrow(VerificationCodeNotExistException::new);

    }

    @Override
    @Transactional(readOnly = true)
    public boolean checkIdDuplicate(String userId) {
        return userRepository.existsByUserId(userId);
    }

    @Override
    @Transactional
    public void modifyIntroduction(String introduce) {
        User user = userRepository.findByPk(currentUser());
        user.updateIntroduce(introduce);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void modifyProfile(MultipartFile multipartFile) throws Exception {
        User user = userRepository.findByPk(currentUser());
        FileDetailDto fileDetailDto = amazonS3Service.save(multipartFile, "profile", user.getPk());

        if (StringUtils.hasText(user.getProfile()) && !user.getProfile().equals("default.png")) {
            amazonS3Service.delete(user.getProfile());
        }

        user.changeProfile(fileDetailDto.getUploadName());
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetailDto findUserInfo(Long userPk) {
        User user = userRepository.findByPk(userPk);
        User currentUser = userRepository.findByPk(currentUser());
        List<Neighbor> neighborList = neighborRepository.findAllByNeighborId_FollowingId(currentUser);
        HashSet<User> followings = new HashSet<>();
        neighborList.forEach(s -> followings.add(s.getNeighborId().getFollowerId()));
        return UserDetailDto.builder()
                .userPk(user.getPk())
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .introduce(user.getIntroduce())
                .profile(user.getProfile())
                .neighbor(followings.contains(user)).build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<SearchUserDto> findNeighborList() {
        List<Neighbor> neighborList = neighborRepository.findAllByNeighborId_FollowingId(userRepository.findByPk(currentUser()));
        List<SearchUserDto> searchUserDtoList = new ArrayList<>();
        neighborList.forEach(v -> searchUserDtoList.add(SearchUserDto.builder()
                .userPk(v.getNeighborId().getFollowerId().getPk())
                .userId(v.getNeighborId().getFollowerId().getUserId())
                .name(v.getNeighborId().getFollowerId().getName())
                .build()));
        return searchUserDtoList;
    }

    @Override
    @Transactional
    public void addNeighbor(Long userPk) {
        neighborRepository.save(Neighbor.builder()
                .neighborId(NeighborId.builder()
                        .followingId(userRepository.findByPk(currentUser()))
                        .followerId(userRepository.findByPk(userPk)).build()).build());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SearchUserDto> searchUser(String name) {
        List<User> userList = userRepository.findByNameContainsOrderByName(name);
        List<SearchUserDto> dtoList = new ArrayList<>();
        userList.forEach(v -> dtoList.add(SearchUserDto.builder()
                .userPk(v.getPk())
                .userId(v.getUserId())
                .name(v.getName()).build()));
        return dtoList;
    }

    @Override
    @Transactional
    public void sendVerificationCode(String email) {

        userVerificationRepository.findById(email).ifPresent(userVerification -> {
            throw new VerificationCodeExistException();
        });

        String verificationCode = getRandomString();

        userVerificationRepository.save(UserVerification.builder()
                .email(email)
                .verificationCode(passwordEncoder.encode(verificationCode))
                .build());

        System.out.println("이메일 전송");
        String subject = "The Record 인증 메일입니다.";
        emailService.sendEmail(email, subject, verificationCode);
    }

    @Override
    @Transactional
    public boolean checkVerificationCode(CertificateDto certificateDto){
        Optional<UserVerification> optionalUserVerification = userVerificationRepository.findById(certificateDto.getUserEmail());

        optionalUserVerification.ifPresent(userVerification -> {
            if (!passwordEncoder.matches(certificateDto.getCertificateNum(), userVerification.getVerificationCode()))
                throw new VerificationCodeMismatchException();
        });

        optionalUserVerification.orElseThrow(VerificationCodeNotExistException::new);

        return true;
    }

    @Override
    @Transactional
    public void reissuePassword(CertificateDto certificateDto) {

        Optional<User> optionalUser = userRepository.findByEmail(certificateDto.getUserEmail());

        optionalUser.ifPresent(user -> {
            checkVerificationCode(certificateDto);

            String newPassword = getRandomString();

            System.out.println("이메일 전송");
            String subject = "새로운 비밀번호가 발급되었습니다.";
            emailService.sendEmail(certificateDto.getUserEmail(), subject, newPassword);

            user.changePassword(passwordEncoder.encode(newPassword));
            userVerificationRepository.delete(userVerificationRepository.findById(certificateDto.getUserEmail()).get());
        });

    }

    @Override
    public String getRandomString() {
        int length = 8 + (int)(Math.random() * 5);
        String generatedPassword = RandomStringUtils.random(length, true, true);
        return generatedPassword;
    }

    @Override
    @Transactional
    public void addPhotoBooth(PhotoBoothDto photoBoothDto) {

        User user = userRepository.findByPk(photoBoothDto.getUserPk());
        String roomIsOpen = String.valueOf(user.getRoomIsOpen());
//
//        if (roomIsOpen.equals("TRUE")) {
//            throw new ExistUserRoomException();
//        }

        user.addPhotoBooth(TrueAndFalse.TRUE);
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public TrueAndFalse checkPhotoBoothIsOpen(String userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        return user.get().getRoomIsOpen();
    }

    @Override
    @Transactional
    public void removePhotoBooth(String userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        User host = userRepository.findByPk(user.get().getPk());
        String roomIsOpen = String.valueOf(host.getRoomIsOpen());

        if (roomIsOpen.equals("FALSE")) {
            throw new ExistUserRoomException("생성된 방이 없습니다.");
        }

        host.addPhotoBooth(TrueAndFalse.FALSE);
        userRepository.save(host);
    }
}
