package com.Project.Backend.Repository;

import com.Project.Backend.Entity.ServiceOfferingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceOfferingRepository extends JpaRepository<ServiceOfferingEntity, Integer> {
    @Query("SELECT s FROM ServiceOfferingEntity s WHERE s.subcontractorEntity.user.email = :email")
    ServiceOfferingEntity findServiceOfferingByUserEmail(@Param("email")String email);
}
