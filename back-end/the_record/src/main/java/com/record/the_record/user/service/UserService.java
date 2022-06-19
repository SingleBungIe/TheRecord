package com.record.the_record.user.service;

import com.record.the_record.entity.enums.TrueAndFalse;
import com.record.the_record.user.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    // 로그인
    String login(UserDto userDto);
    // 회원가입
    void addUser(UserDto userDto);
    // 현재 유저 PK
    Long currentUser();
    // 아이디 중복 확인
    boolean checkIdDuplicate(String userId);
    // 자기소개 수정
    void modifyIntroduction(String introduce);
    // 프로필 사진 변경
    void modifyProfile(MultipartFile multipartFile) throws Exception;
    // 회원 정보 조회
    UserDetailDto findUserInfo(Long userPk);
    // 일촌 목록 조회
    List<SearchUserDto> findNeighborList();
    // 일촌 맺기
    void addNeighbor(Long userPk);
    // 유저 검색
    List<SearchUserDto> searchUser(String name);
    void sendVerificationCode(String email);
    boolean checkVerificationCode(CertificateDto certificateDto);
    void reissuePassword(CertificateDto certificateDto);
    String getRandomString();

    void addPhotoBooth(PhotoBoothDto photoBoothDto);
    TrueAndFalse checkPhotoBoothIsOpen(String userId);
    void removePhotoBooth(String userId);
}
