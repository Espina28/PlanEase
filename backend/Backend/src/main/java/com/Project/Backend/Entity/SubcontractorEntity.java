package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "Subcontractor")
public class SubcontractorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subcontractor_Id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String city;
    private String province;
    private String fullAddress;

    @OneToMany(mappedBy = "subcontractorEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "subcontractor-unavailable-dates")
    private List<UnavailableDates> unavailableDates;

    @OneToOne
    @JsonManagedReference(value = "subcontractor-offering-service")
    private OfferingServiceEntity offeringServiceEntity;

}
