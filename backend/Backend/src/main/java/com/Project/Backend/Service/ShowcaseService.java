package com.Project.Backend.Service;

import com.Project.Backend.DTO.ShowcaseDTO;
import com.Project.Backend.Entity.ServiceOfferingEntity;
import com.Project.Backend.Entity.ShowcaseEntity;
import com.Project.Backend.Repository.ShowcaseRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class ShowcaseService {
    @Autowired
    private ShowcaseRepository showcaseRepository;
    @Autowired
    private ServiceOfferingService serviceOfferingService;

    public ShowcaseEntity createShowcase(ShowcaseDTO showcase) {
        ServiceOfferingEntity serviceOffering = serviceOfferingService.getServiceOfferingById(showcase.getService_offering_id());
        ShowcaseEntity newShowcase = null;
        try {
            newShowcase = new ShowcaseEntity();
            newShowcase.setShowcase_title(showcase.getTitle());
            newShowcase.setShowcase_description(showcase.getDescription());
            newShowcase.setServiceOfferingEntity(serviceOffering);
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
                existingShowcase.setServiceOfferingEntity(showcase.getServiceOfferingEntity());
                return showcaseRepository.save(existingShowcase);
            } else {
                throw new RuntimeException("Showcase not found with id: " + showcase.getShowcase_id());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error editing showcase", e);
        }
    }

    public ShowcaseEntity findShowcaseById(int id) throws Exception {
        return showcaseRepository.findById(id).orElseThrow(() -> new Exception("Showcase not found with id: " + id));
    }

    public List<ShowcaseEntity> getShowcaseByServiceName(String serviceName){
        return showcaseRepository.findAllShowcasesByServiceName(serviceName);
    }

}
