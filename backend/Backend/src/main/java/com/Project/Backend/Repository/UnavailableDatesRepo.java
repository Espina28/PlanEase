package com.Project.Backend.Repository;

import com.Project.Backend.Entity.UnavailableDates;
import com.Project.Backend.Entity.SubcontractorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface UnavailableDatesRepo extends JpaRepository<UnavailableDates, Integer> {
    
    List<UnavailableDates> findBySubcontractorEntity(SubcontractorEntity subcontractor);
    
    @Query("SELECT u FROM UnavailableDates u WHERE u.subcontractorEntity.id = :subcontractorId")
    List<UnavailableDates> findBySubcontractorId(@Param("subcontractorId") int subcontractorId);
    
    @Query("SELECT u FROM UnavailableDates u WHERE u.subcontractorEntity.user.email = :email")
    List<UnavailableDates> findBySubcontractorEmail(@Param("email") String email);
    
    // Check if a date already exists for a specific subcontractor
    boolean existsBySubcontractorEntityAndDate(SubcontractorEntity subcontractor, Date date);
}
