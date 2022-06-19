package com.record.the_record.home.repository;

import com.record.the_record.entity.User;
import com.record.the_record.home.dto.UpdateStatusInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UpdateStatusRepository extends JpaRepository<User, Long> {

//    @Query(
//            value = "", nativeQuery = true
//    )
//    UpdateStatusInterface findUserByDiaryAndPhotoWithJPQL();

}
