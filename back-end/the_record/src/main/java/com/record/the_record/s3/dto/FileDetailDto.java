package com.record.the_record.s3.dto;

import com.record.the_record.s3.util.MultipartUtil;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class FileDetailDto {
    private String format;          // 이미지 확장자
    private String originName;      // 원래 이미지 이름
    private String uploadName;      // 유저 PK / 날짜 + UUID로 변환된 업로드 이름

    @Builder.Default
    private LocalDateTime created = LocalDateTime.now();

    public static FileDetailDto convertFile(Long userPk, String folderType, MultipartFile multipartFile) {
        final String filedId = MultipartUtil.createFileId();
        final String format = MultipartUtil.getFormat(multipartFile.getContentType());
        return FileDetailDto.builder()
                .format(format)
                .originName(multipartFile.getOriginalFilename())
                .uploadName(MultipartUtil.createPath(userPk, folderType, filedId, format))
                .build();
    }
}
