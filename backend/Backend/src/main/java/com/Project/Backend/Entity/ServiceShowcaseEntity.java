package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Service_Showcase")
public class ServiceShowcaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Serviceid;
    private String ServiceShowcase_name;
    private String ServiceShowcase_description;


    @ManyToOne
    @JoinColumn(name = "offering_service_id")
    @JsonBackReference(value = "offering-service-showcase")
    private OfferingServiceEntity offeringServiceEntity;

    @OneToMany(mappedBy = "serviceShowcaseEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "showcase-files")
    private List<ShowcaseFilesEntity> showcaseFilesEntity;

}
