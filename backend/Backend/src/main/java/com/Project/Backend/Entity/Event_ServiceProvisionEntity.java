package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "event_service_provision")
public class Event_ServiceProvisionEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int event_serviceProvision_id;

        // Fixed the column name in @JoinColumn
        @JsonBackReference(value = "transaction-event-service-provision")
        @ManyToOne
        @JoinColumn(name = "transaction_id", nullable = false) // Corrected typo here
        private TransactionsEntity transactionsEntity;



}

