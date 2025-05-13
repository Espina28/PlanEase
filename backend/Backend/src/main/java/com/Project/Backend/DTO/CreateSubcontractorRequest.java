
package com.Project.Backend.DTO;

import com.Project.Backend.Entity.UserEntity;

public class CreateSubcontractorRequest {
    private UserEntity user;
    private String service;

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }
}
