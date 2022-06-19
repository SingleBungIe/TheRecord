package com.record.the_record.aop.exception.customexceptions;

public class CustomAmazonS3Exception extends RuntimeException{

    public CustomAmazonS3Exception() {
        super("파일 서버에 문제가 생겼습니다. 잠시 후 다시 시도해주세요.");
    }

    public CustomAmazonS3Exception(String message) {
        super(message);
    }
}
