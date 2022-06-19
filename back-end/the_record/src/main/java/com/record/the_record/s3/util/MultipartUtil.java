package com.record.the_record.s3.util;

import org.springframework.util.StringUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public final class MultipartUtil {

    /**
     *
     * @return 홈 디렉터리 반환
     */
    public static String getLocalHomeDirectory() {
        return System.getProperty("user.home");
    }

    /**
     *
     * @return UUID값 반환
     */
    public static String createFileId() {
        return UUID.randomUUID().toString();
    }

    /**
     *
     * @param contentType 확장자
     * @return 파일 확장자 반환
     */
    public static String getFormat(String contentType) {
        if(StringUtils.hasText(contentType)) {
            return contentType.substring(contentType.lastIndexOf('/') + 1);
        }
        return null;
    }

    /**
     *
     * @param userPk 유저 PK
     * @param fileId 저장할 파일 이름(UUID)
     * @param format 파일 확장자
     * @return 유저PK/날짜_UUID.확장자 형태로 반환
     */
    public static String createPath(Long userPk, String folderType, String fileId, String format) {
        return String.format("%s/%s/%s.%s", userPk, folderType, new SimpleDateFormat("yyMMdd").format(new Date()) + "_" + fileId, format);
    }
}
