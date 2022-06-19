package com.record.the_record.aop.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class APIException {
    private final String message;
    private final LocalDateTime errorOccurrenceTime;

    public APIException(Exception e) {
        this.message = e.getMessage();
        this.errorOccurrenceTime = LocalDateTime.now();
    }

}
