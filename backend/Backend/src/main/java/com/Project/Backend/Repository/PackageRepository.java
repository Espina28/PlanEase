package com.Project.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Project.Backend.Entity.PackageEntity;

public interface PackageRepository extends JpaRepository<PackageEntity, Long> {
    
}