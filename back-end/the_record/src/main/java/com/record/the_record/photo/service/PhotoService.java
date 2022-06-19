package com.record.the_record.photo.service;

import com.record.the_record.entity.Photo;
import com.record.the_record.photo.dto.PhotoDto;
import com.record.the_record.photo.dto.PhotoDetailDto;
import com.record.the_record.photo.dto.PhotoTitleDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PhotoService {

    Photo addPhoto(PhotoDto photoDto, MultipartFile multipartFile) throws Exception;
    List<PhotoTitleDto> findPhotoTitleList(Long userPk);
    List<PhotoDetailDto> findPhotoList(Long userPk, int page);
    Integer findPhotoTotalPage(Long userPk);
    PhotoDetailDto findPhotoDetail(Long photoId);
    void modifyPhoto(PhotoDetailDto photoDetailDto);
    void removePhoto(Long photoId);
}
