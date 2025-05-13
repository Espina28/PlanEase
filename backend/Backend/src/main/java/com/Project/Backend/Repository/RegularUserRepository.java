package com.Project.Backend.Repository;

import com.Project.Backend.Entity.RegularUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegularUserRepository extends JpaRepository<RegularUserEntity, Integer> {
}
