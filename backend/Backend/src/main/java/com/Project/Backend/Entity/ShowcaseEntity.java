package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Showcase")
public class ShowcaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int showcase_id;
    private String showcase_name;
    private String showcase_description;


    @ManyToOne
    @JoinColumn(name = "service-offering-id")
    @JsonBackReference(value = "service-offering-showcase")
    private ServiceOfferingEntity serviceOfferingEntity;

    @OneToMany(mappedBy = "showcaseEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "showcaseMedia-entity")
    private List<ShowcaseMediaEntity> showcaseMediaEntity;

}
