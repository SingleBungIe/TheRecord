package com.record.the_record.home.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class RecentPhotoDto {

    @ApiModelProperty("인생네컷 번호")
    private Long photoId;
    @ApiModelProperty("인생네컷 제목")
    private String title;
    @ApiModelProperty("인생네컷 촬영 날짜")
    private String recordDt;
    @ApiModelProperty("인생네컷 사진 경로")
    private String mediaUrl;

}
