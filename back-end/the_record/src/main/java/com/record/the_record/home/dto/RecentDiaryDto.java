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
public class RecentDiaryDto {

    @ApiModelProperty("일기 번호")
    private Long diaryId;
    @ApiModelProperty("일기 제목")
    private String title;
    @ApiModelProperty("일기 작성 날짜")
    private String recordDt;

}
