package com.record.the_record.aop.exception.customexceptions;

public class TitleValidateException extends RuntimeException{

    public TitleValidateException() {
        super("제목을 입력해주세요.");
    }

    public TitleValidateException(String message) {
        super(message);
    }
}
