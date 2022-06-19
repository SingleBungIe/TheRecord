package com.record.the_record.user.repository;

import com.record.the_record.entity.UserVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserVerificationRepository extends JpaRepository<UserVerification, String> {

}
