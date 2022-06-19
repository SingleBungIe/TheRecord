package com.record.the_record.aop.exception.customexceptions;

@Deprecated
public class ExistUserRoomException extends RuntimeException {

    public ExistUserRoomException() { super("이미 생성된 방이 존재합니다."); }

    public ExistUserRoomException(String message) { super(message); }
}
