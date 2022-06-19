package com.record.the_record.folder.service;

import com.record.the_record.entity.Folder;
import com.record.the_record.folder.dto.FolderDto;

import java.util.List;

public interface FolderService {

    Folder addFolder(FolderDto folderDto);
    List<FolderDto> findFolderList(Long userPk);
    void modifyFolder(FolderDto folderDto);
    void removeFolder(Long folderId);

}
