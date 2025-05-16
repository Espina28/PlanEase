package com.Project.Backend.Service;

import com.Project.Backend.DTO.ShowcaseDTO;
import com.Project.Backend.Entity.ShowcaseEntity;
import com.Project.Backend.Entity.ShowcaseMediaEntity;
import com.Project.Backend.Entity.SubcontractorEntity;
import com.Project.Backend.Repository.ShowcaseRepository;
import org.springframework.boot.actuate.endpoint.Show;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class ShowcaseService {
    @Autowired
    private ShowcaseRepository showcaseRepository;
    @Autowired
    private SubcontractorService subcontractorService;
    @Autowired
    private ShowcaseMediaService showcaseMediaService;

    public ShowcaseEntity createShowcase(ShowcaseDTO showcase) {
        SubcontractorEntity subcontractor = null;
        ShowcaseEntity newShowcase =  new ShowcaseEntity();
        //save the image url to ShowcaseMediaEntity\

        try {
            subcontractor = subcontractorService.getSubcontractorByEmail(showcase.getEmail());
            newShowcase.setShowcase_title(showcase.getTitle());
            newShowcase.setShowcase_description(showcase.getDescription());
            newShowcase.setSubcontractor(subcontractor);
        } catch (Exception e) {
            throw new RuntimeException("Error creating showcase");
        }
        return showcaseRepository.save(newShowcase);
    }

    public ShowcaseEntity editShowcase(ShowcaseEntity showcase) {
        try {
            Optional<ShowcaseEntity> optionalShowcaseEntity = showcaseRepository.findById(showcase.getShowcase_id());
            if (optionalShowcaseEntity.isPresent()) {
                ShowcaseEntity existingShowcase = optionalShowcaseEntity.get();
                existingShowcase.setShowcase_title(showcase.getShowcase_title());
                existingShowcase.setShowcase_description(showcase.getShowcase_description());
                return showcaseRepository.save(existingShowcase);
            } else {
                throw new RuntimeException("Showcase not found with id: " + showcase.getShowcase_id());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error editing showcase", e);
        }
    }


    public List<ShowcaseEntity> getAllShowcaseByUserEmail(String email){
        return showcaseRepository.getAllShowcaseByUserEmail(email);
    }

    public ShowcaseEntity findShowcaseById(int id) {
        return showcaseRepository.findById(id).orElse(null);
    }

    public String deleteShowcase(int id) {
        String message = "";
        try {
            ShowcaseEntity showcase = findShowcaseById(id);

            if(showcase == null)
                return "Showcase not found";
            showcaseRepository.deleteById(id);
        } catch (Exception e) {
            return null;
        }
        return message = "deleted successfully";
    }



}
