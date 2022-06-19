package com.record.the_record.entity;

import com.record.the_record.entity.enums.VisibleStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Photo {
    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "user_pk")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Enumerated(EnumType.STRING)
    private VisibleStatus visibleStatus;

    private String title;

    private String mediaUrl;

    private LocalDateTime recordDt;

    public void updatePhoto(String title, VisibleStatus visibleStatus) {
        this.title = title;
        this.visibleStatus = visibleStatus;
    }
}
