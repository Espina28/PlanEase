package com.Project.Backend.Repository;

import com.Project.Backend.Entity.EventServiceEntity;
import com.Project.Backend.Service.EventService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventServiceRepository extends JpaRepository<EventServiceEntity, Integer> {
}
