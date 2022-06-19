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
public class PhotoBoothDto {
    @ApiModelProperty("유저 번호")
    private Long userPk;
    @ApiModelProperty("유저 아이디")
    private String userId;
}
