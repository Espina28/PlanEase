package com.Project.Backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "admins")
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int adminId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserEntity user;

    public AdminEntity() {}

    public AdminEntity(UserEntity user) {
        this.user = user;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
