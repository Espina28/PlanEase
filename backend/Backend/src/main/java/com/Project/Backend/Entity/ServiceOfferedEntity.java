package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "service_offered")
public class ServiceOfferedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceOffered_id;
    private String serviceOffered_name;
    private double serviceOffered_price;

    @OneToOne(mappedBy = "serviceName")
    @JsonBackReference("subcontractor-offering-service")
    private SubcontractorEntity subcontractor;

    @OneToMany(mappedBy = "serviceOffered")
    @JsonManagedReference("offering-package-service")
    private List<PackageServicesEntity> packageServices;

    @OneToMany(mappedBy = "serviceOffered")
    @JsonManagedReference("offering-showcase-service")
    private List<EventServiceEntity> eventServices;

    public int getServiceOffered_id() {
        return serviceOffered_id;
    }

    public void setServiceOffered_id(int serviceOffered_id) {
        this.serviceOffered_id = serviceOffered_id;
    }

    public String getServiceOffered_name() {
        return serviceOffered_name;
    }

    public void setServiceOffered_name(String serviceOffered_name) {
        this.serviceOffered_name = serviceOffered_name;
    }

    public double getServiceOffered_price() {
        return serviceOffered_price;
    }

    public void setServiceOffered_price(double serviceOffered_price) {
        this.serviceOffered_price = serviceOffered_price;
    }

    public SubcontractorEntity getSubcontractor() {
        return subcontractor;
    }

    public void setSubcontractor(SubcontractorEntity subcontractor) {
        this.subcontractor = subcontractor;
    }

    public List<PackageServicesEntity> getPackageServices() {
        return packageServices;
    }

    public void setPackageServices(List<PackageServicesEntity> packageServices) {
        this.packageServices = packageServices;
    }

    public List<EventServiceEntity> getEventServices() {
        return eventServices;
    }

    public void setEventServices(List<EventServiceEntity> eventServices) {
        this.eventServices = eventServices;
    }
}
