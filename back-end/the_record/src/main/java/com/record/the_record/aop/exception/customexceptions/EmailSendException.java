package com.record.the_record.aop.exception.customexceptions;

public class EmailSendException extends RuntimeException {

    public EmailSendException() {
        super("이메일 전송에 실패했습니다.");
    }

    public EmailSendException(String message) {
        super(message);
    }
}
