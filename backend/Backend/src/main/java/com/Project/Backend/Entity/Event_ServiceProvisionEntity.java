package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Event_ServiceProvisionEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int event_serviceProvision_id;

        @JsonBackReference(value = "service-offering-event-service-provision")
        @ManyToOne
        @JoinColumn(name = "servicesOffering_id")
        private ServiceOfferingEntity serviceOfferingEntity;

        @JsonBackReference(value = "transaction-event-service-provision")
        @ManyToOne
        @JoinColumn(name = "transcation_id")
        private TransactionsEntity transactionsEntity ;


}

