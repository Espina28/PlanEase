package com.Project.Backend.Repository;

import com.Project.Backend.Entity.ServiceOfferingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceOfferingRepository extends JpaRepository<ServiceOfferingEntity, Integer> {
}
