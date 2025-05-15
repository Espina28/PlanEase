package com.Project.Backend.DTO;

public class ShowcaseDTO {
    private int service_offering_id;
    private String title;
    private String description;
    private String[] imageUrls;

    public int getService_offering_id() {
        return service_offering_id;
    }

    public void setService_offering_id(int service_offering_id) {
        this.service_offering_id = service_offering_id;
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

    public String[] getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(String[] imageUrls) {
        this.imageUrls = imageUrls;
    }
}
