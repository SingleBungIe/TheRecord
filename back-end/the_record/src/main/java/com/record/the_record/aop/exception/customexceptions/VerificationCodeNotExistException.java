package com.record.the_record.aop.exception.customexceptions;


public class VerificationCodeNotExistException extends RuntimeException {

    public VerificationCodeNotExistException() {
        super("인증번호가 존재하지 않습니다.");
    }

    public VerificationCodeNotExistException(String message) {
        super(message);
    }
}
