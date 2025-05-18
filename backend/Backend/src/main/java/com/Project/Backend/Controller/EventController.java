package com.Project.Backend.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Project.Backend.Entity.EventEntity;
import com.Project.Backend.Service.EventService;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/createEvent")
    public ResponseEntity<EventEntity> create(@RequestBody EventEntity event) {
        return ResponseEntity.ok(eventService.create(event));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventEntity> findById(@PathVariable int id) {
        return ResponseEntity.ok(eventService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<EventEntity>> readAll() {
        return ResponseEntity.ok(eventService.readAll());
    }

    @PutMapping
    public ResponseEntity<EventEntity> update(@RequestBody EventEntity event) {
        return ResponseEntity.ok(eventService.update(event));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable int id) {
        eventService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    
    // @GetMapping("/available")
    // public ResponseEntity<List<EventEntity>> readAvailable() {
    //     return ResponseEntity.ok(eventService.readAvailable());
    // }
}
