package com.Project.Backend.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;


@Entity
@Table(name = "Showcase_Files")
public class ShowcaseFilesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int showcaseFile_id;
    private String showcaseFile_imageurl;
    private String showcaseFile_fileName;

    @ManyToOne
    @JoinColumn(name = "service_showcase_id")
    @JsonBackReference(value = "showcase-files")
    private ServiceShowcaseEntity serviceShowcaseEntity;

}
