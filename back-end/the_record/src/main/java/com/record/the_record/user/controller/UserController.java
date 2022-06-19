package com.record.the_record.user.controller;

import com.record.the_record.user.dto.CertificateDto;
import com.record.the_record.user.dto.SearchUserDto;
import com.record.the_record.user.dto.UserDetailDto;
import com.record.the_record.user.dto.UserDto;
import com.record.the_record.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@ApiParam(value = "가입 정보") @RequestBody UserDto userDto) {
        userService.addUser(userDto);
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    public ResponseEntity<String> loginTest(@ApiParam(value = "로그인 정보") @RequestBody UserDto userDto) {
        return ResponseEntity.ok().body(userService.login(userDto));
    }

    @ApiOperation(value = "아이디 중복 체크")
    @GetMapping("/id-check/{user-id}")
    public ResponseEntity<Boolean> idCheck(@ApiParam(value = "유저 아이디") @PathVariable("user-id") String userId) {
        return ResponseEntity.ok().body(userService.checkIdDuplicate(userId));
    }

    @ApiOperation(value = "자기소개 수정")
    @PutMapping("/introduction")
    public ResponseEntity<String> introductionAdd(@ApiParam(value = "자기소개") @RequestBody UserDto userDto) {
        userService.modifyIntroduction(userDto.getIntroduce());
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "프로필 사진 변경")
    @PutMapping("/profile")
    public ResponseEntity<String> modifyUserProfile(@ApiParam(value = "프로필 사진") @RequestPart("profile") MultipartFile multipartFile) throws Exception {
        userService.modifyProfile(multipartFile);
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "회원 정보 조회")
    @GetMapping("/{user-pk}/info")
    public ResponseEntity<UserDetailDto> userInfoDetail(@ApiParam(value = "유저 PK") @PathVariable("user-pk") Long userPk) {
        return ResponseEntity.ok().body(userService.findUserInfo(userPk));
    }

    @ApiOperation(value = "일촌 목록 조회")
    @GetMapping("/neighbor")
    public ResponseEntity<List<SearchUserDto>> neighborList() {
        return ResponseEntity.ok().body(userService.findNeighborList());
    }

    @ApiOperation(value = "일촌 맺기")
    @PostMapping("/neighbor")
    public ResponseEntity<String> neighborAdd(@ApiParam(value = "유저 PK") @RequestBody UserDto userDto) {
        userService.addNeighbor(userDto.getUserPk());
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "유저 검색")
    @GetMapping("/{name}")
    public ResponseEntity<List<SearchUserDto>> userSearch(@ApiParam(value = "유저 이름") @PathVariable("name") String name) {
        return ResponseEntity.ok().body(userService.searchUser(name));
    }

    @ApiOperation(value="이메일 인증번호 받기")
    @PostMapping("/email/number")
    public ResponseEntity<String> joinVerificationCodeSend(@ApiParam(value = "이메일") @RequestBody CertificateDto certificateDto){
        userService.sendVerificationCode(certificateDto.getUserEmail());
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "이메일 인증번호 체크")
    @PostMapping("/email-check")
    public ResponseEntity<String> verificationCodeCheck(@ApiParam(value = "인증 정보") @RequestBody CertificateDto certificateDto) {
        userService.checkVerificationCode(certificateDto);
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "비밀번호 재발급")
    @PostMapping("/password/reissue")
    public ResponseEntity<String> passwordReissue(@ApiParam(value = "인증 정보") @RequestBody CertificateDto certificateDto){
        userService.reissuePassword(certificateDto);
        return ResponseEntity.ok().body("success");
    }

}
