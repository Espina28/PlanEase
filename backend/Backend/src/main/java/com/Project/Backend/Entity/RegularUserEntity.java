package com.Project.Backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "regular_users")
public class RegularUserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int regularUserId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserEntity user;

    public RegularUserEntity() {}

    public RegularUserEntity(UserEntity user) {
        this.user = user;
    }

    public int getRegularUserId() {
        return regularUserId;
    }

    public void setRegularUserId(int regularUserId) {
        this.regularUserId = regularUserId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
