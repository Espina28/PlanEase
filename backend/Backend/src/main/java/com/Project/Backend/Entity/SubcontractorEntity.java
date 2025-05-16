package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Subcontractors")
public class SubcontractorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subcontractor_Id;

    private String service_name; //Catering, Photography,etc..
    @Column(columnDefinition = "TEXT")
    private String description;
    private Boolean isAvailable;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserEntity user;

    //here
    @OneToMany(mappedBy = "subcontractor")
    @JsonManagedReference("subcontactor-showcase")
    private List<ShowcaseEntity> showcase;

    @OneToMany(mappedBy = "subcontractorEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "subcontractor-unavailable-dates")
    private List<UnavailableDates> unavailableDates;

    public SubcontractorEntity() {}

    public int getSubcontractor_Id() {
        return subcontractor_Id;
    }

    public void setSubcontractor_Id(int subcontractor_Id) {
        this.subcontractor_Id = subcontractor_Id;
    }

    public String getService_name() {
        return service_name;
    }

    public void setService_name(String service_name) {
        this.service_name = service_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public List<ShowcaseEntity> getShowcase() {
        return showcase;
    }

    public void setShowcase(List<ShowcaseEntity> showcase) {
        this.showcase = showcase;
    }

    public List<UnavailableDates> getUnavailableDates() {
        return unavailableDates;
    }

    public void setUnavailableDates(List<UnavailableDates> unavailableDates) {
        this.unavailableDates = unavailableDates;
    }
}
