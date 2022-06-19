package com.record.the_record.aop.exception.customexceptions;


import com.amazonaws.AmazonClientException;

public class UploadException extends AmazonClientException {

    public UploadException() {
        super("이미지 업로드에 실패하였습니다. 잠시 후 다시 시도해주세요.");
    }

    public UploadException(String message) {
        super(message);
    }
}
