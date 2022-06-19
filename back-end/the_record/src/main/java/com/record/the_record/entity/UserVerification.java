package com.record.the_record.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserVerification {

    @Id
    @Email
    private String email;

    private String verificationCode;

}
