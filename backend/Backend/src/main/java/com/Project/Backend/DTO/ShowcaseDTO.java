package com.Project.Backend.DTO;

import com.Project.Backend.Entity.ShowcaseMediaEntity;

import java.util.List;

public class ShowcaseDTO {
    private String email;
    private String title;
    private String description;
    private List<ShowcaseMediaDTO> imageUrls;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<ShowcaseMediaDTO> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<ShowcaseMediaDTO> imageUrls) {
        this.imageUrls = imageUrls;
    }
}
