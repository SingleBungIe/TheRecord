package com.record.the_record.email.service;

import com.record.the_record.aop.exception.customexceptions.EmailSendException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;

    @Override
    public void sendEmail(String userEmail, String subject, String msg){
        MimeMessage message = emailSender.createMimeMessage();

        try {
            message.addRecipients(Message.RecipientType.TO, userEmail);
            message.setSubject(subject);

            StringBuilder formattedMsg = new StringBuilder("");
            formattedMsg.append(msg);

            message.setText(formattedMsg.toString(), "utf-8", "html");
            message.setFrom(new InternetAddress("ssafy0601@gmail.com", "TheRecord"));

            emailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new EmailSendException();
        }


    }
}
