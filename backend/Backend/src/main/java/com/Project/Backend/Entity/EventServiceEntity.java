package com.Project.Backend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "event_services")
public class EventServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventServices_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceOffered_id")
    private ServiceOfferedEntity serviceOffered;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    private TransactionsEntity transactions;

    public int getEventServices_id() {
        return eventServices_id;
    }

    public void setEventServices_id(int eventServices_id) {
        this.eventServices_id = eventServices_id;
    }

    public ServiceOfferedEntity getServiceOffered() {
        return serviceOffered;
    }

    public void setServiceOffered(ServiceOfferedEntity serviceOffered) {
        this.serviceOffered = serviceOffered;
    }

    public TransactionsEntity getTransactions() {
        return transactions;
    }

    public void setTransactions(TransactionsEntity transactions) {
        this.transactions = transactions;
    }
}
