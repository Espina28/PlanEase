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

    private String transaction_venue;
    private Status transaction_status;
    private Date transaction_date;
    private Boolean transaction_isActive;


    public enum Status {
        SUCCESS, CANCELLED, PENDING
    }

}
