package com.record.the_record.s3.service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.record.the_record.aop.exception.customexceptions.CustomAmazonS3Exception;
import com.record.the_record.aop.exception.customexceptions.CustomFileNotFoundException;
import com.record.the_record.s3.dto.FileDetailDto;
import com.record.the_record.s3.util.MultipartUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AmazonS3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;        // Config에서 등록한 AwsS3Client 빈이 주입됨

    public FileDetailDto save(MultipartFile multipartFile, String folderType, Long userPk) throws Exception {
        FileDetailDto fileDetailDto = FileDetailDto.convertFile(userPk, folderType, multipartFile);     // multipartfile을 FileDetailDto로 변환
        File file = new File(MultipartUtil.getLocalHomeDirectory(), fileDetailDto.getOriginName());

        try {
            multipartFile.transferTo(file);             // 파일 변환(putObject에 넣기 위해)
            amazonS3Client.putObject(new PutObjectRequest(bucket, fileDetailDto.getUploadName(), file)      // S3에 Upload
                    .withCannedAcl(CannedAccessControlList.PublicRead));        // CannedAccessControlList.PublicRead로 설정해야 누구나 파일에 접근 가능
        } catch (IOException e) {
            throw new CustomFileNotFoundException();
        } catch (AmazonClientException e) {
            throw new CustomAmazonS3Exception();
        } finally {
            if (file.exists()) {
                file.delete();
            }
        }

        return fileDetailDto;
    }

    public void delete(String fileKey) throws CustomAmazonS3Exception {
        amazonS3Client.deleteObject(bucket, fileKey);
    }
}
