package com.record.the_record.home.service;

import com.record.the_record.entity.Diary;
import com.record.the_record.entity.Photo;
import com.record.the_record.entity.User;
import com.record.the_record.entity.enums.VisibleStatus;
import com.record.the_record.home.dto.RecentDiaryDto;
import com.record.the_record.diary.repository.DiaryRepository;
import com.record.the_record.home.dto.RecentPhotoDto;
import com.record.the_record.home.dto.UpdateStatusDto;
import com.record.the_record.photo.repository.PhotoRepository;
import com.record.the_record.user.repository.UserRepository;
import com.record.the_record.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    private final UserRepository userRepository;
    private final UserService userService;

    private final DiaryRepository diaryRepository;
    private final PhotoRepository photoRepository;

    @Override
    @Transactional(readOnly = true)
    public List<RecentDiaryDto> findRecentDiaryList(Long userPk) {

        Long loginUser = userService.currentUser();
        User host = userRepository.findByPk(userPk);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");

        List<Diary> recentDiaryList;
        List<RecentDiaryDto> recentDiaryDtoList = new ArrayList<>();

        if(loginUser != userPk) {
            recentDiaryList = diaryRepository.findTop4ByUserAndVisibleStatusOrderByRecordDtDesc(host, visibleStatus);
        } else {
            recentDiaryList = diaryRepository.findTop4ByUser_PkOrderByRecordDtDesc(userPk);
        }

        recentDiaryList.forEach(v ->  recentDiaryDtoList.add(RecentDiaryDto.builder()
                .diaryId(v.getId())
                .title(v.getTitle())
                .recordDt(String.valueOf(v.getRecordDt()).substring(0,10))
                .build()));

        return recentDiaryDtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecentPhotoDto> findRecentPhotoList(Long userPk) {

        Long loginUser = userService.currentUser();
        User host = userRepository.findByPk(userPk);
        VisibleStatus visibleStatus = VisibleStatus.valueOf("PUBLIC");

        List<Photo> recentPhotoList;
        List<RecentPhotoDto> recentPhotoDtoList = new ArrayList<>();

        if(loginUser != userPk) {
            recentPhotoList = photoRepository.findTop3ByUserAndVisibleStatusOrderByRecordDtDesc(host, visibleStatus);
        } else {
            recentPhotoList = photoRepository.findTop3ByUser_PkOrderByRecordDtDesc(userPk);
        }

        recentPhotoList.forEach(v -> recentPhotoDtoList.add(RecentPhotoDto.builder()
                .photoId(v.getId())
                .title(v.getTitle())
                .recordDt(String.valueOf(v.getRecordDt()).substring(0,10))
                .mediaUrl(v.getMediaUrl())
                .build()));

        return recentPhotoDtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public UpdateStatusDto findUpdateStatus(Long userPk) {

        User user = userRepository.findByPk(userPk);
        UpdateStatusDto updateStatusDto = new UpdateStatusDto();
        LocalDateTime currentDate = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0));
        LocalDateTime startDate = currentDate.withDayOfMonth(1);
        LocalDateTime endDate = currentDate.withDayOfMonth(LocalDate.now().lengthOfMonth());

        Long diaryCurrentMonthCnt = diaryRepository.countByUserAndRecordDtBetween(user, startDate, endDate);
        Long diaryAllCount = diaryRepository.countByUser(user);
        Long photoCurrentMonthCnt = photoRepository.countByUserAndRecordDtBetween(user, startDate, endDate);
        Long photoAllCount = photoRepository.countByUser(user);

        updateStatusDto.setDiaryCurrentMonthCnt(diaryCurrentMonthCnt);
        updateStatusDto.setDiaryAllCount(diaryAllCount);
        updateStatusDto.setPhotoCurrentMonthCnt(photoCurrentMonthCnt);
        updateStatusDto.setPhotoAllCount(photoAllCount);

        return updateStatusDto;
    }
}
