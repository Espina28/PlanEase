package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.net.httpserver.Authenticator;
import jakarta.persistence.*;

import java.io.LineNumberReader;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "Transactions")
public class TransactionsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transaction_Id;

    @JoinColumn(name = "event_id")
    @ManyToOne
    @JsonBackReference(value = "event-transaction")
    private EventEntity eventEntity;

    @OneToMany(mappedBy = "transactionsEntity", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "transaction-event-service-provision")
    private List<Event_ServiceProvisionEntity> eventServiceProvisionEntity;

    private String transactionVenue;
    private Status transactionStatus;
    private Date transactionDate;
    private Boolean transactionIsActive;

    public enum Status {
        SUCCESS, CANCELLED, PENDING
    }

    // Getters and Setters

    public int getTransaction_Id() {
        return transaction_Id;
    }

    public void setTransaction_Id(int transaction_Id) {
        this.transaction_Id = transaction_Id;
    }

    public EventEntity getEventEntity() {
        return eventEntity;
    }

    public void setEventEntity(EventEntity eventEntity) {
        this.eventEntity = eventEntity;
    }

    public List<Event_ServiceProvisionEntity> getEventServiceProvisionEntity() {
        return eventServiceProvisionEntity;
    }

    public void setEventServiceProvisionEntity(List<Event_ServiceProvisionEntity> eventServiceProvisionEntity) {
        this.eventServiceProvisionEntity = eventServiceProvisionEntity;
    }

    public String getTransactionVenue() {
        return transactionVenue;
    }

    public void setTransactionVenue(String transactionVenue) {
        this.transactionVenue = transactionVenue;
    }

    public Status getTransactionStatus() {
        return transactionStatus;
    }

    public void setTransactionStatus(Status transactionStatus) {
        this.transactionStatus = transactionStatus;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Boolean getTransactionIsActive() {
        return transactionIsActive;
    }

    public void setTransactionIsActive(Boolean transactionIsActive) {
        this.transactionIsActive = transactionIsActive;
    }
}
