package com.Project.Backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Table(name = "payments")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "paymentId")
public class PaymentEntity {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int paymentId;

    @OneToOne
    @JoinColumn(name = "transaction_id")
    @JsonBackReference("transaction-payment")
    private TransactionsEntity transaction;

    private Date paymentDatePaid;
    private String paymentNote;
    private STATUS paymentStatus = STATUS.ACCEPTED;

    @PrePersist //before it save to db this will run first to ensue the variables will not be empty
    protected void onCreate() {
        this.paymentDatePaid = Date.valueOf(LocalDateTime.now().toLocalDate());
    }

    public enum STATUS {
        ACCEPTED, REJECTED, RETURNED
    }

    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public Date getPaymentDatePaid() {
        return paymentDatePaid;
    }

    public void setPaymentDatePaid(Date paymentDatePaid) {
        this.paymentDatePaid = paymentDatePaid;
    }

    public String getPaymentNote() {
        return paymentNote;
    }

    public void setPaymentNote(String paymentNote) {
        this.paymentNote = paymentNote;
    }

    public STATUS getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(STATUS paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
