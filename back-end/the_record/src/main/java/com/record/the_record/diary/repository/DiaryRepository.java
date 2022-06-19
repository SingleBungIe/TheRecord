package com.record.the_record.diary.repository;

import com.record.the_record.entity.Diary;
import com.record.the_record.entity.Folder;
import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.VisibleStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary,Long> {

    List<Diary> findTop4ByUserAndVisibleStatusOrderByRecordDtDesc(User user, VisibleStatus visibleStatus);
    List<Diary> findTop4ByUser_PkOrderByRecordDtDesc(Long userPk);

    Long countByUser(User user);
    Long countByUserAndRecordDtBetween(User user, LocalDateTime startDate, LocalDateTime endDate);

    Page<Diary> findByUserAndVisibleStatusOrderByRecordDtDesc(Pageable pageable, User user, VisibleStatus visibleStatus);
    Page<Diary> findByUser_PkOrderByRecordDtDesc(Pageable pageable,Long userPk);

    List<Diary> findByUserAndVisibleStatusAndFolder(User user, VisibleStatus visibleStatus, Folder folder);
    List<Diary> findByUser_PkAndFolder(Long userPk, Folder folder);

    List<Diary> findByUserAndVisibleStatusAndRecordDtBetween(User user, VisibleStatus visibleStatus, LocalDateTime startDate, LocalDateTime endDate);
    List<Diary> findByUser_PkAndRecordDtBetween(Long userPk, LocalDateTime startDate, LocalDateTime endDate);

    Diary findOneById(Long diaryId);

}
