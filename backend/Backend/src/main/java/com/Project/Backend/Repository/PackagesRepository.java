package com.Project.Backend.Repository;

import com.Project.Backend.Entity.PackagesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackagesRepository extends JpaRepository<PackagesEntity, Integer> {
}
