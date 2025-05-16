package com.Project.Backend.Repository;

import com.Project.Backend.Entity.ShowcaseMediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowcaseMediaRepository extends JpaRepository<ShowcaseMediaEntity, Integer> {

    @Query("SELECT sm FROM ShowcaseMediaEntity sm WHERE sm.showcaseEntity.showcase_title = :showcase_title")
    List<ShowcaseMediaEntity> findByShowcaseMediaByShowcaseTitle(@Param("showcase_title") String showcase_title);

//    @Query("SELECT sm FROM ShowcaseMediaEntity sm WHERE sm.image_url = :image_url")
//    ShowcaseMediaEntity findShowcaseMediaByImage_url(String image_url);

}
