package com.record.the_record.folder.controller;

import com.record.the_record.folder.dto.FolderDto;
import com.record.the_record.folder.service.FolderService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folder")
@RequiredArgsConstructor
public class FolderController {

    private final FolderService folderService;

    @ApiOperation(value = "폴더 추가")
    @PostMapping()
    public ResponseEntity<String> folderAdd(@RequestBody @ApiParam(value = "저장할 폴더 정보")FolderDto folderDto) {
        folderService.addFolder(folderDto);
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "폴더 조회")
    @GetMapping("/{user-pk}")
    public ResponseEntity<List<FolderDto>> folderList(@PathVariable("user-pk") @ApiParam(value = "유저 번호")Long userPk) {
        return ResponseEntity.ok().body(folderService.findFolderList(userPk));
    }

    @ApiOperation(value = "폴더 수정")
    @PutMapping()
    public ResponseEntity<String> folderModify(@RequestBody @ApiParam(value = "수정하고자 하는 폴더 정보")FolderDto folderDto) {
        folderService.modifyFolder(folderDto);
        return ResponseEntity.ok().body("success");
    }

    @ApiOperation(value = "폴더 삭제")
    @DeleteMapping("/{folder-id}")
    public ResponseEntity<String> folderRemove(@PathVariable("folder-id") @ApiParam(value = "폴더 번호")Long folderId) {
        folderService.removeFolder(folderId);
        return ResponseEntity.ok().body("success");
    }

}
