package com.record.the_record.aop.exception.customexceptions;

public class VerificationCodeExistException extends RuntimeException {

    public VerificationCodeExistException() {
        super("이미 인증번호를 전송했습니다. 메일을 확인해주세요.");
    }

    public VerificationCodeExistException(String message) {
        super(message);
    }
}
