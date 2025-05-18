package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "package_services")
public class PackageServicesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int package_service_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "packages_id")
    @JsonBackReference("package-service")
    private PackagesEntity packages;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offering_service_id")
    @JsonBackReference("offering-package-service")
    private ServiceOfferedEntity serviceOffered;

    public int getPackage_service_id() {
        return package_service_id;
    }

    public void setPackage_service_id(int package_service_id) {
        this.package_service_id = package_service_id;
    }

    public PackagesEntity getPackages() {
        return packages;
    }

    public void setPackages(PackagesEntity packages) {
        this.packages = packages;
    }

    public ServiceOfferedEntity getServiceOffered() {
        return serviceOffered;
    }

    public void setServiceOffered(ServiceOfferedEntity serviceOffered) {
        this.serviceOffered = serviceOffered;
    }
}
