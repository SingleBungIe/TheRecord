package com.record.the_record.photo.controller;

import com.record.the_record.photo.dto.PhotoDto;
import com.record.the_record.photo.dto.PhotoDetailDto;
import com.record.the_record.photo.dto.PhotoTitleDto;
import com.record.the_record.photo.service.PhotoService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/photo")
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;

    @ApiOperation(value = "인생네컷 업로드")
    @PostMapping()
    public ResponseEntity<String> photoAdd(@RequestPart(value = "photoDto") @ApiParam(value = "저장할 인생네컷 정보") PhotoDto photoDto,
                                           @RequestPart(value = "file") @ApiParam(value = "저장할 인생네컷 이미지")MultipartFile multipartFile) throws Exception {
        photoService.addPhoto(photoDto, multipartFile);
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "인생네컷 최신순 제목 조회")
    @GetMapping("/list/{user-pk}")
    public ResponseEntity<List<PhotoTitleDto>> photoTitleList(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk) {
        return ResponseEntity.ok().body(photoService.findPhotoTitleList(userPk));
    }

    @ApiOperation(value = "인생네컷 최신순 목록 조회(페이지 당 3개씩)")
    @GetMapping("/{user-pk}/{page}")
    public ResponseEntity<List<PhotoDetailDto>> photoList(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk,
                                                          @PathVariable @ApiParam(value = "페이지 번호, 0부터 시작")int page) {
        return ResponseEntity.ok().body(photoService.findPhotoList(userPk, page));
    }

    @ApiOperation(value = "인생네컷 전체 페이지 수 조회 (0부터 시작)")
    @GetMapping("/{user-pk}/page")
    public ResponseEntity<Integer> photoTotalPage(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk) {
        return ResponseEntity.ok().body(photoService.findPhotoTotalPage(userPk));
    }

    @ApiOperation(value = "인생네컷 상세정보 조회")
    @GetMapping("/{photo-id}")
    public ResponseEntity<PhotoDetailDto> photoDetails(@PathVariable("photo-id") @ApiParam(value = "사진 번호")Long photoId) {
        return ResponseEntity.ok().body(photoService.findPhotoDetail(photoId));
    }

    @ApiOperation(value = "인생네컷 상세정보 수정")
    @PutMapping()
    public ResponseEntity<String> photoModify(@RequestBody @ApiParam("수정하고자 하는 사진 정보")PhotoDetailDto photoDetailDto) {
        photoService.modifyPhoto(photoDetailDto);
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "인생네컷 삭제")
    @DeleteMapping("/{photo-id}")
    public ResponseEntity<String> photoRemove(@PathVariable("photo-id") @ApiParam(value = "사진 번호")Long photoId) {
        photoService.removePhoto(photoId);
        return ResponseEntity.ok().body("success");
    }

}
