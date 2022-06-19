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
public class DiaryTitleDto {

    @ApiModelProperty("일기 번호")
    private Long diaryId;
    @ApiModelProperty("일기 제목")
    private String title;
    @ApiModelProperty("일기 공개여부")
    private String visible;
    @ApiModelProperty("일기 작성 날짜")
    private String recordDt;

}
