package com.Project.Backend.Repository;

import com.Project.Backend.Entity.ShowcaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowcaseRepository extends JpaRepository<ShowcaseEntity,Integer> {

    @Query ("SELECT s FROM ShowcaseEntity s WHERE s.serviceOfferingEntity.serviceOffering_name = :serviceName")
    List<ShowcaseEntity> findAllShowcasesByServiceName(@Param("serviceTitle")String serviceName);
}
