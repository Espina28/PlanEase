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

    @Column(columnDefinition = "TEXT")
    private String subcontractor_description;
    private String subcontractor_serviceName;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference("subcontractor-user")
    private UserEntity userId;

    //here
    @OneToMany(mappedBy = "subcontractor")
    @JsonManagedReference("subcontactor-showcase")
    private List<ShowcaseEntity> showcase;

    @OneToMany(mappedBy = "subcontractor", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "subcontractor-unavailable-dates")
    private List<UnavailableDates> unavailableDates;

    @OneToMany(mappedBy = "subcontractor")
    @JsonManagedReference("subcontractor-eventservice")
    private List<EventServiceEntity> eventName;

    @OneToMany(mappedBy = "subcontractor")
    @JsonManagedReference("subcontractor-package-service")
    private List<PackageServicesEntity> packageServices;

    public int getSubcontractor_Id() {
        return subcontractor_Id;
    }

    public void setSubcontractor_Id(int subcontractor_Id) {
        this.subcontractor_Id = subcontractor_Id;
    }

    public String getSubcontractor_description() {
        return subcontractor_description;
    }

    public void setSubcontractor_description(String subcontractor_description) {
        this.subcontractor_description = subcontractor_description;
    }

    public String getSubcontractor_serviceName() {
        return subcontractor_serviceName;
    }

    public void setSubcontractor_serviceName(String subcontractor_serviceName) {
        this.subcontractor_serviceName = subcontractor_serviceName;
    }

    public UserEntity getUser() {
        return userId;
    }

    public void setUser(UserEntity user) {
        this.userId = user;
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

    public List<EventServiceEntity> getEventName() {
        return eventName;
    }

    public void setEventName(List<EventServiceEntity> eventName) {
        this.eventName = eventName;
    }

    public List<PackageServicesEntity> getPackageServices() {
        return packageServices;
    }

    public void setPackageServices(List<PackageServicesEntity> packageServices) {
        this.packageServices = packageServices;
    }
}
