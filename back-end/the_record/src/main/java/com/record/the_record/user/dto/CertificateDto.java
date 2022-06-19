package com.record.the_record.user.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.Email;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class CertificateDto {
    @ApiModelProperty("인증 번호")
    private String certificateNum;

    @Email
    @ApiModelProperty("인증 메일")
    private String userEmail;
}
