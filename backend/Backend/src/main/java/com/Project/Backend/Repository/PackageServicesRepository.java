package com.Project.Backend.Repository;

import com.Project.Backend.Entity.PackageServicesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageServicesRepository extends JpaRepository<PackageServicesEntity, Integer> {
}
