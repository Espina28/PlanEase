package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;
 
@Entity
@Table(name = "Unavailable_Dates")
public class UnavailableDates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int unavailableDate_id;
    private Date date;
    private String reason;
    private Timestamp created_at;

    @ManyToOne
    @JoinColumn(name = "subcontractor_id")
    @JsonBackReference(value = "subcontractor-unavailable-dates")
    private SubcontractorEntity subcontractorEntity;

}
