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
    private String showcase_title;
    private String showcase_description;


    @ManyToOne
    @JoinColumn(name = "service-offering-id")
    @JsonBackReference(value = "service-offering-showcase")
    private ServiceOfferingEntity serviceOfferingEntity;

    @OneToMany(mappedBy = "showcaseEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "showcaseMedia-entity")
    private List<ShowcaseMediaEntity> showcaseMediaEntity;

    public int getShowcase_id() {
        return showcase_id;
    }

    public void setShowcase_id(int showcase_id) {
        this.showcase_id = showcase_id;
    }

    public String getShowcase_title() {
        return showcase_title;
    }

    public void setShowcase_title(String showcase_title) {
        this.showcase_title = showcase_title;
    }

    public String getShowcase_description() {
        return showcase_description;
    }

    public void setShowcase_description(String showcase_description) {
        this.showcase_description = showcase_description;
    }

    public ServiceOfferingEntity getServiceOfferingEntity() {
        return serviceOfferingEntity;
    }

    public void setServiceOfferingEntity(ServiceOfferingEntity serviceOfferingEntity) {
        this.serviceOfferingEntity = serviceOfferingEntity;
    }

    public List<ShowcaseMediaEntity> getShowcaseMediaEntity() {
        return showcaseMediaEntity;
    }

    public void setShowcaseMediaEntity(List<ShowcaseMediaEntity> showcaseMediaEntity) {
        this.showcaseMediaEntity = showcaseMediaEntity;
    }
}
