package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Transactions")
public class TransactionsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transaction_Id;


    @JoinColumn(name = "user_id")
    @ManyToOne
    @JsonManagedReference(value = "user-transaction")
    private UserEntity user;

    @JoinColumn(name = "event_id")
    @ManyToOne
    @JsonBackReference(value = "event-transaction")
    private EventEntity eventEntity;

    @OneToOne
    @JoinColumn(name = "package_id")
    @JsonManagedReference(value = "transaction-package")
    private PackagesEntity packages;

    @OneToMany
    @JsonManagedReference(value = "transaction-event-service")
    private List<EventServiceEntity> eventServices;

    private String transactionVenue;
    private Status transactionStatus;
    private Date transactionDate;
    private Boolean transactionIsActive;
    private Boolean transactionisApprove;

    public enum Status {
        ACCEPTED, CANCELLED, PENDING
    }

    // Getters and Setters

    @PrePersist //before it save to db this will run first to ensue the variables will not be empty
    protected void onCreate() {
        this.transactionDate = Date.valueOf(LocalDateTime.now().toLocalDate());
        this.transactionIsActive = true;
        this.transactionisApprove = false;
        this.transactionStatus = Status.PENDING;
    }

    public int getTransaction_Id() {
        return transaction_Id;
    }

    public void setTransaction_Id(int transaction_Id) {
        this.transaction_Id = transaction_Id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public EventEntity getEventEntity() {
        return eventEntity;
    }

    public void setEventEntity(EventEntity eventEntity) {
        this.eventEntity = eventEntity;
    }

    public PackagesEntity getPackages() {
        return packages;
    }

    public void setPackages(PackagesEntity packages) {
        this.packages = packages;
    }

    public List<EventServiceEntity> getEventService() {
        return eventServices;
    }

    public void setEventService(List<EventServiceEntity> eventServices) {
        this.eventServices = eventServices;
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

    public Boolean getTransactionisApprove() {
        return transactionisApprove;
    }

    public void setTransactionisApprove(Boolean transactionisApprove) {
        this.transactionisApprove = transactionisApprove;
    }
}
