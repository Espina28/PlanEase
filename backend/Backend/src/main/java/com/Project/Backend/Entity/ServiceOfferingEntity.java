package com.Project.Backend.Entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Service_Offering")
public class ServiceOfferingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int offeringService_id;
    private String service_name;
    private String service_description;
    private Boolean is_active;

    @OneToOne
    @JoinColumn(name = "subcontractor_id")
    @JsonBackReference("subcontractor-service-offering")
    private SubcontractorEntity subcontractorEntity;

    @OneToMany(mappedBy = "serviceOfferingEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "service-offering-showcase")
    private List<ShowcaseEntity> showcaseEntity;


}
