package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "event_services")
public class EventServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventServices_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subcontractor_id")
    private SubcontractorEntity subcontractor;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    @JsonBackReference("transaction-event-service")
    private TransactionsEntity transactionsId;

    public int getEventServices_id() {
        return eventServices_id;
    }

    public void setEventServices_id(int eventServices_id) {
        this.eventServices_id = eventServices_id;
    }

    public TransactionsEntity getTransactions() {
        return transactionsId;
    }

    public void setTransactions(TransactionsEntity transactionsId) {
        this.transactionsId = transactionsId;
    }
}
