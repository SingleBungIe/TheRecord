package com.record.the_record.user.repository;

import com.record.the_record.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(String userId);
    boolean existsByUserId(String userId);
    User findByPk(Long pk);
    List<User> findByNameContainsOrderByName(String name);
    Optional<User> findByEmail(String email);
}
