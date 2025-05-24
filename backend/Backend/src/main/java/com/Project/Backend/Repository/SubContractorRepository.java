package com.Project.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Project.Backend.Entity.SubcontractorEntity;

import java.util.List;

@Repository
public interface SubContractorRepository extends JpaRepository<SubcontractorEntity, Integer>{

    @Query("SELECT s FROM SubcontractorEntity s WHERE s.user.email = :email")
    SubcontractorEntity findByEmail(@Param("email") String email);

    @org.springframework.data.jpa.repository.Query("SELECT s FROM SubcontractorEntity s WHERE s.subcontractor_serviceCategory = :subcontractor_serviceCategory")
    List<SubcontractorEntity> findBySubcontractorServiceCategory(@org.springframework.data.repository.query.Param("subcontractor_serviceCategory") String subcontractor_serviceCategory);
}
