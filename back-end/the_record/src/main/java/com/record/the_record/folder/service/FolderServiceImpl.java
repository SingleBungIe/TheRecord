package com.record.the_record.folder.service;

import com.record.the_record.entity.Folder;
import com.record.the_record.entity.User;
import com.record.the_record.folder.dto.FolderDto;
import com.record.the_record.folder.repository.FolderRepository;
import com.record.the_record.user.repository.UserRepository;
import com.record.the_record.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FolderServiceImpl implements FolderService{

    private final FolderRepository folderRepository;

    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    @Transactional
    public Folder addFolder(FolderDto folderDto) {

        Long userPk = userService.currentUser();
        User user = userRepository.findByPk(userPk);

        Folder folder = Folder.builder()
                .name(folderDto.getName())
                .user(user)
                .build();

        return folderRepository.save(folder);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FolderDto> findFolderList(Long userPk) {

        User user = userRepository.findByPk(userPk);
        List<Folder> folderList = folderRepository.findByUser(user);
        List<FolderDto> folderDtoList = new ArrayList<>();

        folderList.forEach(v -> folderDtoList.add(FolderDto.builder()
                .folderId(v.getId())
                .name(v.getName())
                .build()));

        return folderDtoList;
    }

    @Override
    @Transactional
    public void modifyFolder(FolderDto folderDto) {

        Folder folder = folderRepository.findOneById(folderDto.getFolderId());
        folder.updateFolder(folderDto.getName());

        folderRepository.save(folder);

    }

    @Override
    @Transactional
    public void removeFolder(Long folderId) {

        Folder folder = folderRepository.findOneById(folderId);
        folderRepository.delete(folder);

    }
}
