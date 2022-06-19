package com.record.the_record.photo.repository;

import com.record.the_record.entity.Photo;
import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.VisibleStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    List<Photo> findTop3ByUserAndVisibleStatusOrderByRecordDtDesc(User user, VisibleStatus visibleStatus);
    List<Photo> findTop3ByUser_PkOrderByRecordDtDesc(Long userPk);

    Long countByUser(User user);
    Long countByUserAndRecordDtBetween(User user, LocalDateTime startDate, LocalDateTime endDate);

    List<Photo> findByUserAndVisibleStatusOrderByRecordDtDesc(User user, VisibleStatus visibleStatus);
    List<Photo> findByUser_PkOrderByRecordDtDesc(Long userPk);

    Page<Photo> findByUserAndVisibleStatusOrderByRecordDtDesc(Pageable pageable, User user, VisibleStatus visibleStatus);
    Page<Photo> findByUser_PkOrderByRecordDtDesc(Pageable pageable, Long userPk);

    Integer countByUserAndVisibleStatus(User user, VisibleStatus visibleStatus);
    Integer countByUser_Pk(Long userPk);

    Photo findOneById(Long photoId);

}
