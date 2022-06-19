package com.record.the_record.aop.exception.customexceptions;

public class NoUserException extends RuntimeException{

    public NoUserException() {
        super("로그인에 실패하였습니다.\n아이디 혹은 비밀번호를 확인해주세요.");
    }

    public NoUserException(String message) {
        super(message);
    }
}
