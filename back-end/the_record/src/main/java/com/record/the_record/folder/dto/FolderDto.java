package com.record.the_record.folder.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel
public class FolderDto {

    @ApiModelProperty("폴더 번호")
    private Long folderId;
    @ApiModelProperty("폴더 이름")
    private String name;

}
