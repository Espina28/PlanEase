package com.Project.Backend.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;


@Entity
@Table(name = "Showcase_Media")
public class ShowcaseMediaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int showcaseMedia_id;
    private String showcaseMedia_imageurl;
    private String showcaseMedia_fileName;

    @ManyToOne
    @JoinColumn(name = "showcase_id")
    @JsonBackReference(value = "showcaseMedia-entity")
    private ShowcaseEntity showcaseEntity;

}
