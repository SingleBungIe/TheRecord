package com.record.the_record.folder.repository;


import com.record.the_record.entity.Folder;
import com.record.the_record.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {

    List<Folder> findByUser(User user);
    Folder findOneById(Long folderId);

}
