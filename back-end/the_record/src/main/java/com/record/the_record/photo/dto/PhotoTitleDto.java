package com.record.the_record.photo.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class PhotoTitleDto {

    @ApiModelProperty("인생네컷 번호")
    private Long photoId;
    @ApiModelProperty("인생네컷 제목")
    private String title;
    @ApiModelProperty("인생네컷 공개여부")
    private String visible;
    @ApiModelProperty("인생네컷 촬영 날짜")
    private String recordDt;

}
