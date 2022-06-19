package com.record.the_record.diary.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class DiaryDto {

    @ApiModelProperty("일기 번호")
    private Long diaryId;
    @ApiModelProperty("폴더 번호")
    private Long folderId;
    @ApiModelProperty("일기 제목")
    private String title;
    @ApiModelProperty("일기 내용")
    private String content;
    @ApiModelProperty("일기 카테고리")
    private String category;
    @ApiModelProperty("영상 및 사진 일기 경로")
    private String mediaUrl;
    @ApiModelProperty("일기 공개여부")
    private String visible;

}
