package com.Project.Backend.DTO;

import java.sql.Date;

public class UnavailableDatesDTO {
    private String email;  // to identify the subcontractor
    private Date date;
    private String reason;

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
