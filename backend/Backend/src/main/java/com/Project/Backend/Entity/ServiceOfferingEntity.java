//package com.Project.Backend.Entity;
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import jakarta.persistence.*;
//
//import java.util.List;
//
//@Entity
//@Table(name = "Service_Offering")
//public class ServiceOfferingEntity {     //THIS CLASS WILL BE DELETED  <<---------------------------
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int serviceOffering_id;
//    private String serviceOffering_name;
//    private String serviceOffering_description;
//    private Boolean serviceOffering_is_active;
//
//    @OneToOne
//    @JoinColumn(name = "subcontractor_id")
//    @JsonBackReference("subcontractor-service-offering")
//    private SubcontractorEntity subcontractorEntity;
//
//    @OneToMany(mappedBy = "serviceOfferingEntity", fetch = FetchType.LAZY)
//    @JsonManagedReference(value = "service-offering-showcase")
//    private List<ShowcaseEntity> showcaseEntity;
//
//    @OneToMany(mappedBy = "serviceOfferingEntity", fetch = FetchType.LAZY)
//    @JsonManagedReference(value = "service-offering-event-service-provision")
//    private List<Event_ServiceProvisionEntity> eventServiceProvisionEntity;
//
//
//
//    public int getServiceOffering_id() {
//        return serviceOffering_id;
//    }
//
//    public void setServiceOffering_id(int serviceOffering_id) {
//        this.serviceOffering_id = serviceOffering_id;
//    }
//
//    public String getServiceOffering_name() {
//        return serviceOffering_name;
//    }
//
//    public void setServiceOffering_name(String serviceOffering_name) {
//        this.serviceOffering_name = serviceOffering_name;
//    }
//
//    public String getServiceOffering_description() {
//        return serviceOffering_description;
//    }
//
//    public void setServiceOffering_description(String serviceOffering_description) {
//        this.serviceOffering_description = serviceOffering_description;
//    }
//
//    public Boolean getServiceOffering_is_active() {
//        return serviceOffering_is_active;
//    }
//
//    public void setServiceOffering_is_active(Boolean serviceOffering_is_active) {
//        this.serviceOffering_is_active = serviceOffering_is_active;
//    }
//
//    public SubcontractorEntity getSubcontractorEntity() {
//        return subcontractorEntity;
//    }
//
//    public void setSubcontractorEntity(SubcontractorEntity subcontractorEntity) {
//        this.subcontractorEntity = subcontractorEntity;
//    }
//
//    public List<ShowcaseEntity> getShowcaseEntity() {
//        return showcaseEntity;
//    }
//
//    public void setShowcaseEntity(List<ShowcaseEntity> showcaseEntity) {
//        this.showcaseEntity = showcaseEntity;
//    }
//}
