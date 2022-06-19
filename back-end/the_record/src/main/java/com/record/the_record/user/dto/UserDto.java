package com.record.the_record.user.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class UserDto {

    @ApiModelProperty("유저 번호")
    private Long userPk;
    @ApiModelProperty("유저 아이디")
    private String userId;
    @ApiModelProperty("유저 비밀번호")
    private String password;
    @ApiModelProperty("유저 이름")
    private String name;
    @ApiModelProperty("유저 이메일")
    private String email;
    @ApiModelProperty("자기소개")
    private String introduce;
    @ApiModelProperty("프로필 사진 경로")
    private String profile;
    @ApiModelProperty("인증번호")
    private String certificateNum;

}
