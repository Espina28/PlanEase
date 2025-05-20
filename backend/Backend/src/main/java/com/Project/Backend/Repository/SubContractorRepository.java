package com.Project.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Project.Backend.Entity.SubcontractorEntity;

@Repository
public interface SubContractorRepository extends JpaRepository<SubcontractorEntity, Integer>{

    @Query("SELECT s FROM SubcontractorEntity s WHERE s.user.email = :email")
    SubcontractorEntity findByEmail(@Param("email") String email);
}
