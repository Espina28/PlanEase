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
    @JsonManagedReference(value = "subcontractor-service-offering")
    private ServiceOfferingEntity serviceOfferingEntity;

    @OneToMany(mappedBy = "subcontractorEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "subcontractor-unavailable-dates")
    private List<UnavailableDates> unavailableDates;

    public SubcontractorEntity() {}

    public SubcontractorEntity(UserEntity user, ServiceOfferingEntity serviceOfferingEntity) {
        this.user = user;
        this.serviceOfferingEntity = serviceOfferingEntity;
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

    public ServiceOfferingEntity getOfferingServiceEntity() {
        return serviceOfferingEntity;
    }

    public void setOfferingServiceEntity(ServiceOfferingEntity serviceOfferingEntity) {
        this.serviceOfferingEntity = serviceOfferingEntity;
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
