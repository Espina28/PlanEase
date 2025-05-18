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
    private String description;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserEntity user;

    //here
    @OneToMany(mappedBy = "subcontractor")
    @JsonManagedReference("subcontactor-showcase")
    private List<ShowcaseEntity> showcase;

    @OneToMany(mappedBy = "subcontractor", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "subcontractor-unavailable-dates")
    private List<UnavailableDates> unavailableDates;

    @OneToOne
    @JoinColumn(name = "service_offered_id")
    @JsonManagedReference("subcontractor-offering-service")
    private ServiceOfferedEntity serviceName;

    public int getSubcontractor_Id() {
        return subcontractor_Id;
    }

    public void setSubcontractor_Id(int subcontractor_Id) {
        this.subcontractor_Id = subcontractor_Id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public ServiceOfferedEntity getServiceName() {
        return serviceName;
    }

    public void setServiceName(ServiceOfferedEntity serviceName) {
        this.serviceName = serviceName;
    }
}
