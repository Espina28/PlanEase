package com.Project.Backend.Repository;

import com.Project.Backend.Entity.ShowcaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowcaseRepository extends JpaRepository<ShowcaseEntity,Integer> {
}
