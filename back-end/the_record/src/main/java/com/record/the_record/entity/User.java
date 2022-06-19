package com.record.the_record.entity;

import com.record.the_record.entity.enums.TrueAndFalse;
import com.record.the_record.entity.enums.UserRole;
import lombok.*;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long pk;

    @NotBlank
    private String userId;

    @NotBlank
    private String name;

    @NotNull
    @Email
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;

    @Column(length = 2000)
    private String introduce;

    @Nullable
    private String profile;

    @Enumerated(EnumType.STRING)
    private TrueAndFalse roomIsOpen;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(userRole);
        return grantedAuthorities;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public void updateIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public void changeProfile(String uploadName) {
        this.profile = uploadName;
    }

    public void addPhotoBooth(TrueAndFalse roomIsOpen) {
        this.roomIsOpen = roomIsOpen;
    }
    
    public void changePassword(String password) {
        this.password = password;
    }
}
