package com.Project.Backend.DTO;

import com.Project.Backend.Entity.ShowcaseEntity;

public class CreateShowcaseMedia {
    private String imageUrl;
    private String fileName;
    private int showcase_id;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getShowcase_id() {
        return showcase_id;
    }

    public void setShowcase_id(int showcase_id) {
        this.showcase_id = showcase_id;
    }
}
