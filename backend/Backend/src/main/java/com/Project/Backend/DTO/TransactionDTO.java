package com.Project.Backend.DTO;

import com.Project.Backend.Entity.TransactionsEntity;
import java.sql.Date;

public class TransactionDTO {
    private Integer transactionId;
    private Integer eventId;
    private String venue;
    private TransactionsEntity.Status status;
    private Date date;
    private Boolean isActive;
    
    // Added event details for frontend display
    private String eventName;
    private Double eventPrice;
    private String eventDescription;
    
    // Constructors
    public TransactionDTO() {}
    
    public TransactionDTO(Integer transactionId, Integer eventId, String venue, 
                          TransactionsEntity.Status status, Date date, Boolean isActive,
                          String eventName, Double eventPrice, String eventDescription) {
        this.transactionId = transactionId;
        this.eventId = eventId;
        this.venue = venue;
        this.status = status;
        this.date = date;
        this.isActive = isActive;
        this.eventName = eventName;
        this.eventPrice = eventPrice;
        this.eventDescription = eventDescription;
    }
    
    // Static method to convert Entity to DTO
    public static TransactionDTO fromEntity(TransactionsEntity entity) {
        String eventName = null;
        Double eventPrice = null;
        String eventDescription = null;
        
        if (entity.getEventEntity() != null) {
            eventName = entity.getEventEntity().getEvent_name();
            eventPrice = entity.getEventEntity().getEvent_price();
            eventDescription = entity.getEventEntity().getEvent_description();
        }
        
        return new TransactionDTO(
            entity.getTransaction_Id(),
            entity.getEventEntity() != null ? entity.getEventEntity().getEvent_Id() : null,
            entity.getTransactionVenue(),
            entity.getTransactionStatus(),
            entity.getTransactionDate(),
            entity.getTransactionIsActive(),
            eventName,
            eventPrice,
            eventDescription
        );
    }
    
    // Getters and Setters
    public Integer getTransactionId() {
        return transactionId;
    }
    
    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }
    
    public Integer getEventId() {
        return eventId;
    }
    
    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }
    
    public String getVenue() {
        return venue;
    }
    
    public void setVenue(String venue) {
        this.venue = venue;
    }
    
    public TransactionsEntity.Status getStatus() {
        return status;
    }
    
    public void setStatus(TransactionsEntity.Status status) {
        this.status = status;
    }
    
    public Date getDate() {
        return date;
    }
    
    public void setDate(Date date) {
        this.date = date;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public String getEventName() {
        return eventName;
    }
    
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }
    
    public Double getEventPrice() {
        return eventPrice;
    }
    
    public void setEventPrice(Double eventPrice) {
        this.eventPrice = eventPrice;
    }
    
    public String getEventDescription() {
        return eventDescription;
    }
    
    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }
}
