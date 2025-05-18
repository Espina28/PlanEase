package com.Project.Backend.Repository;

import com.Project.Backend.Entity.ServiceOfferedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServiceOfferedRepository extends JpaRepository<ServiceOfferedEntity, Integer>{

    @Query("SELECT s FROM ServiceOfferedEntity s WHERE s.serviceOffered_name = :serviceName")
    ServiceOfferedEntity findByServiceByName(@Param("serviceName") String serviceName);
}
