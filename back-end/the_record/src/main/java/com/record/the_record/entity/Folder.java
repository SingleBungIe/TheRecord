package com.record.the_record.entity;

import com.record.the_record.entity.enums.VisibleStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Folder {
    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "user_pk")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    private String name;

    @Builder.Default
    @OneToMany(mappedBy = "folder", cascade = CascadeType.ALL)
    private List<Diary> diaryList = new ArrayList<>();

    public void updateFolder(String name) {
        this.name = name;
    }
}
