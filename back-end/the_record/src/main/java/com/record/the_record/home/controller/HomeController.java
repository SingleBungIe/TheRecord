package com.record.the_record.home.controller;

import com.record.the_record.home.dto.RecentDiaryDto;
import com.record.the_record.home.dto.RecentPhotoDto;
import com.record.the_record.home.dto.UpdateStatusDto;
import com.record.the_record.home.service.HomeService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/home/user")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @ApiOperation(value = "최신 일기 조회")
    @GetMapping("/{user-pk}/diary")
    public ResponseEntity<List<RecentDiaryDto>> recentDiaryList(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk) {
        return ResponseEntity.ok().body(homeService.findRecentDiaryList(userPk));
    }

    @ApiOperation(value = "최신 인생네컷 조회")
    @GetMapping("/{user-pk}/photo")
    public ResponseEntity<List<RecentPhotoDto>> recentPhotoList(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk) {
        return ResponseEntity.ok().body(homeService.findRecentPhotoList(userPk));
    }

    @ApiOperation(value = "이번달 업데이트 현황 조회")
    @GetMapping("/{user-pk}/month")
    public ResponseEntity<UpdateStatusDto> updateStatusDetails(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk) {
        return ResponseEntity.ok().body(homeService.findUpdateStatus(userPk));
    }

}
