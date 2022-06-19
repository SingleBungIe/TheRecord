package com.record.the_record.photo.service;

import com.record.the_record.aop.exception.customexceptions.TitleValidateException;
import com.record.the_record.entity.Photo;
import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.VisibleStatus;
import com.record.the_record.photo.dto.PhotoDto;
import com.record.the_record.photo.dto.PhotoDetailDto;
import com.record.the_record.photo.dto.PhotoTitleDto;
import com.record.the_record.photo.repository.PhotoRepository;
import com.record.the_record.s3.dto.FileDetailDto;
import com.record.the_record.s3.service.AmazonS3Service;
import com.record.the_record.user.repository.UserRepository;
import com.record.the_record.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService{

    private final PhotoRepository photoRepository;

    private final UserRepository userRepository;
    private final UserService userService;
    private final AmazonS3Service amazonS3Service;

    @Override
    @Transactional
    public Photo addPhoto(PhotoDto photoDto, MultipartFile multipartFile) throws Exception {

        VisibleStatus getVisible = VisibleStatus.valueOf(photoDto.getVisible());
        Long userPk = userService.currentUser();
        User user = userRepository.findByPk(userPk);

        // S3 업로드
        FileDetailDto fileDetailDto = amazonS3Service.save(multipartFile, "photo", userPk);

        if (photoDto.getTitle().isEmpty()) {
            throw new TitleValidateException();
        }

        Photo photo = Photo.builder()
                .title(photoDto.getTitle())
                .visibleStatus(getVisible)
                .mediaUrl(fileDetailDto.getUploadName())
                .recordDt(LocalDateTime.now())
                .user(user)
                .build();

        return photoRepository.save(photo);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PhotoTitleDto> findPhotoTitleList(Long userPk) {
        // 자신의 홈페이지인지 판별 후 전제공개+비공개 / 전체공개 나눠서 보여주기!
        Long loginUser = userService.currentUser();
        User host = userRepository.findByPk(userPk);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");

        List<Photo> photoList;
        List<PhotoTitleDto> photoDtoList = new ArrayList<>();

        if(loginUser != userPk) {
            photoList = photoRepository.findByUserAndVisibleStatusOrderByRecordDtDesc(host, visibleStatus);
        } else {
            photoList = photoRepository.findByUser_PkOrderByRecordDtDesc(userPk);
        }

        photoList.forEach(v -> photoDtoList.add(PhotoTitleDto.builder()
                .photoId(v.getId())
                .title(v.getTitle())
                .recordDt(String.valueOf(v.getRecordDt()).substring(0,10))
                .visible(String.valueOf(v.getVisibleStatus()))
                .build()));

        return photoDtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PhotoDetailDto> findPhotoList(Long userPk, int page) {
        int size = 3;

        Long loginUser = userService.currentUser();
        User host = userRepository.findByPk(userPk);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");
        Pageable pageable = PageRequest.of(page, size);

        Page<Photo> photoList;
        List<PhotoDetailDto> photoDtoList = new ArrayList<>();

        if(loginUser != userPk) {
            photoList = photoRepository.findByUserAndVisibleStatusOrderByRecordDtDesc(pageable, host, visibleStatus);
        } else {
            photoList = photoRepository.findByUser_PkOrderByRecordDtDesc(pageable, userPk);
        }

        photoList.forEach(v -> photoDtoList.add(PhotoDetailDto.builder()
                .photoId(v.getId())
                .title(v.getTitle())
                .mediaUrl(v.getMediaUrl())
                .recordDt(String.valueOf(v.getRecordDt()).substring(0,10))
                .visible(String.valueOf(v.getVisibleStatus()))
                .build()));

        return photoDtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public Integer findPhotoTotalPage(Long userPk) {
        Integer totalPage = 0;

        Long loginUser = userService.currentUser();
        User host = userRepository.findByPk(userPk);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");

        if(loginUser != userPk) {
            totalPage = photoRepository.countByUserAndVisibleStatus(host, visibleStatus);
        } else {
            totalPage = photoRepository.countByUser_Pk(userPk);
        }

        if((totalPage%3) == 0) {
            totalPage = (totalPage/3) - 1;
        } else {
            totalPage = (int) Math.ceil(totalPage/3);
        }

        return totalPage;
    }

    @Override
    @Transactional(readOnly = true)
    public PhotoDetailDto findPhotoDetail(Long photoId) {

        Photo photo = photoRepository.findOneById(photoId);

        PhotoDetailDto photoDetailDto = PhotoDetailDto.builder()
                .photoId(photo.getId())
                .title(photo.getTitle())
                .mediaUrl(photo.getMediaUrl())
                .recordDt(String.valueOf(photo.getRecordDt()).substring(0,10))
                .visible(String.valueOf(photo.getVisibleStatus()))
                .build();

        return photoDetailDto;
    }

    @Override
    @Transactional
    public void modifyPhoto(PhotoDetailDto photoDetailDto) {

        Photo photo = photoRepository.findOneById(photoDetailDto.getPhotoId());
        photo.updatePhoto(photoDetailDto.getTitle(), VisibleStatus.valueOf(photoDetailDto.getVisible()));

        photoRepository.save(photo);
    }

    @Override
    @Transactional
    public void removePhoto(Long photoId) {
        Photo photo = photoRepository.findOneById(photoId);
        amazonS3Service.delete(photo.getMediaUrl());
        photoRepository.delete(photo);
    }

}
