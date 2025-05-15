package com.Project.Backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;




@Entity
@Table(name ="Events")
public class EventEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private int event_id;
    private String Event_name;
    private String Event_description;
    private boolean Event_isAvailable;
    private double Event_price;

    public void setId(int event_id) {
        this.event_id = event_id;
    }
    public int getId() {
        return event_id;
    }

    public void setName(String Event_name) {
        this.Event_name = Event_name;
    }
    public String getName() {
        return Event_name;
    }


    public void setDescription(String Event_description) {
        this.Event_description = Event_description;
    }
    public String getDescription() {
        return Event_description;
    }
    
    
    public void setAvailable(boolean Event_isAvailable) {
        this.Event_isAvailable = Event_isAvailable;
    }
    public boolean getsAvailable(){
        return Event_isAvailable;
    }
  
    
    public void setPrice(double Event_price) {
        this.Event_price = Event_price;
    }
    public double getPrice() {
        return Event_price;
    }

    
}
