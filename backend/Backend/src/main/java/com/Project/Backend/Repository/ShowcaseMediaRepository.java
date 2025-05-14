package com.Project.Backend.Repository;

import com.Project.Backend.Entity.ShowcaseMediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowcaseMediaRepository extends JpaRepository<ShowcaseMediaEntity, Integer> {
}
