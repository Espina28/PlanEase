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

    private String service; //Catering, Photography,etc..

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserEntity user;

    @OneToOne
    @JsonManagedReference(value = "subcontractor-offering-service")
    private OfferingServiceEntity offeringServiceEntity;

    @OneToMany(mappedBy = "subcontractorEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "subcontractor-unavailable-dates")
    private List<UnavailableDates> unavailableDates;

    public SubcontractorEntity() {}

    public SubcontractorEntity(UserEntity user, OfferingServiceEntity offeringServiceEntity) {
        this.user = user;
        this.offeringServiceEntity = offeringServiceEntity;
    }


    public int getSubcontractorId() {
        return subcontractor_Id;
    }

    public void setSubcontractorId(int subcontractor_Id) {
        this.subcontractor_Id = subcontractor_Id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public OfferingServiceEntity getOfferingServiceEntity() {
        return offeringServiceEntity;
    }

    public void setOfferingServiceEntity(OfferingServiceEntity offeringServiceEntity) {
        this.offeringServiceEntity = offeringServiceEntity;
    }

    public List<UnavailableDates> getUnavailableDates() {
        return unavailableDates;
    }

    public void setUnavailableDates(List<UnavailableDates> unavailableDates) {
        this.unavailableDates = unavailableDates;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }


}
