package com.record.the_record.aop.exception.customexceptions;

public class UserExistException extends RuntimeException {

    public UserExistException() {
        super("해당 이메일로 이미 가입한 내역이 있습니다.");
    }

    public UserExistException(String message) {
        super(message);
    }
}
