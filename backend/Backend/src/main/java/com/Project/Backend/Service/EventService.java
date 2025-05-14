package com.Project.Backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Project.Backend.Entity.EventEntity;
import com.Project.Backend.Repository.EventRepository;



@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public EventEntity create(EventEntity event) {
        return eventRepository.save(event);
    }

    public EventEntity findById(int id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public List<EventEntity> readAll() {
        return eventRepository.findAll();
    }

    public EventEntity update(EventEntity event) {
        return eventRepository.save(event);
    }

    public void deleteById(int id) {
        eventRepository.deleteById(id);
    }


    // public List<EventEntity> readAvailable() {
    //     return eventRepository.findByIsAvailableTrue();
    // }
}
