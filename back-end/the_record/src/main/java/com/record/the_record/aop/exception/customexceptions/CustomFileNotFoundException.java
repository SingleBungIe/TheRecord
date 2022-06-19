package com.record.the_record.aop.exception.customexceptions;

import java.io.IOException;

public class CustomFileNotFoundException extends IOException {

    public CustomFileNotFoundException() {
        super("파일을 찾을 수 없습니다. 다시 시도해주세요.");
    }

    public CustomFileNotFoundException(String message) {
        super(message);
    }
}
