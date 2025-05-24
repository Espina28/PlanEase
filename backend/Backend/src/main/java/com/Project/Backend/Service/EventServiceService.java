package com.Project.Backend.Service;

import com.Project.Backend.Entity.EventServiceEntity;
import com.Project.Backend.Repository.EventServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceService {

    @Autowired
    private EventServiceRepository eventServiceRepository;

    public EventServiceEntity create(EventServiceEntity eventService) {
        return eventServiceRepository.save(eventService);
    }

    public EventServiceEntity readById(int id) {
        return eventServiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public List<EventServiceEntity> getAll(){
        return eventServiceRepository.findAll();
    }

    public EventServiceEntity update(EventServiceEntity eventService) {
        return eventServiceRepository.save(eventService);
    }

    public void deleteById(int id) {
        eventServiceRepository.deleteById(id);
    }

}
