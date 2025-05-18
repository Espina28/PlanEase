package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name ="Events")
public class EventEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "eventEntity")
    @JsonBackReference("event-transaction")
    private List<TransactionsEntity> transactionsEntity;


    private String event_name;
    private String event_description;
    private boolean event_isAvailable;
    private double event_price;
    private String event_image;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<TransactionsEntity> getTransactionsEntity() {
        return transactionsEntity;
    }

    public void setTransactionsEntity(List<TransactionsEntity> transactionsEntity) {
        this.transactionsEntity = transactionsEntity;
    }

    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public String getEvent_description() {
        return event_description;
    }

    public void setEvent_description(String event_description) {
        this.event_description = event_description;
    }

    public boolean isEvent_isAvailable() {
        return event_isAvailable;
    }

    public void setEvent_isAvailable(boolean event_isAvailable) {
        this.event_isAvailable = event_isAvailable;
    }

    public double getEvent_price() {
        return event_price;
    }

    public void setEvent_price(double event_price) {
        this.event_price = event_price;
    }
    public String getEvent_image() {
        return event_image;
    }

    public void setEvent_image(String event_image) {
        this.event_image = event_image;
    }
    
}
