
package com.Project.Backend.DTO;

import com.Project.Backend.Entity.UserEntity;

public class CreateSubcontractorRequest {
    private UserEntity user;
    private String service;
    private String description;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
