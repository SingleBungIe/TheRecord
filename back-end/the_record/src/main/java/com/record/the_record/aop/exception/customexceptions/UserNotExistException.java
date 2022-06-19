package com.record.the_record.aop.exception.customexceptions;

public class UserNotExistException extends RuntimeException {

    public UserNotExistException() {
        super("가입내역이 존재하지 않습니다.");
    }

    public UserNotExistException(String message) {
        super(message);
    }
}
