package com.record.the_record.email.service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailService {

    void sendEmail(String userEmail, String subject, String msg);

}
