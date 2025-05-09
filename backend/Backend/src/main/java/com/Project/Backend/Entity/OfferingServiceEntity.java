package com.Project.Backend.Entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Offering_Service")
public class OfferingServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int offeringService_id;
    private String service_name;
    private String service_description;
    private Boolean is_active;

    @OneToOne
    @JoinColumn(name = "subcontractor_id")
    @JsonIgnoreProperties("subcontractor-offering-service")
    private SubcontractorEntity subcontractorEntity;

    @OneToMany(mappedBy = "offeringServiceEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "offering-service-showcase")
    private List<ServiceShowcaseEntity> serviceShowcaseEntity;


}
