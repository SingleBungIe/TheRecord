package com.record.the_record.aop.exception.customexceptions;

public class VerificationCodeMismatchException extends RuntimeException {

    public VerificationCodeMismatchException() {
        super("인증번호가 일치하지 않습니다.");
    }

    public VerificationCodeMismatchException(String message) {
        super(message);
    }
}
