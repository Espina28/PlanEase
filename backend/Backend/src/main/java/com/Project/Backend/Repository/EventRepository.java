package com.Project.Backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.Project.Backend.Entity.EventEntity;

import java.util.List;

public interface EventRepository extends JpaRepository<EventEntity, Integer> {
    // List<EventEntity> findByIsAvailableTrue();
}
