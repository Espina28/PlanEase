package com.Project.Backend.Service;

import java.util.List;
import java.util.Optional;

import com.Project.Backend.Repository.SubContractorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Project.Backend.Entity.SubcontractorEntity;
import software.amazon.awssdk.core.exception.SdkClientException;

@Service
public class SubcontractorService {

    @Autowired
    private SubContractorRepository subContractorRepository;
    @Autowired
    private S3Service s3Service;

//    public SubcontractorEntity saveSubcontractor(CreateSubcontractorRequest createSubcontractorRequest) {
//        SubcontractorEntity subcontractorEntity = new SubcontractorEntity();
//        ServiceOfferedEntity serviceOfferedEntity = null;
//        try{
//            serviceOfferedEntity = serviceOfferedService.findByServiceByName(createSubcontractorRequest.getService());
//            if(serviceOfferedEntity == null){
//                return null;
//            }
//            subcontractorEntity.setServiceName(serviceOfferedEntity);
//            subcontractorEntity.setUser(createSubcontractorRequest.getUser());
//        } catch (RuntimeException e) {
//            throw new RuntimeException(e);
//        }
//
//    }

    public List<SubcontractorEntity> getAllSubcontractors() {
        return subContractorRepository.findAll();
    }

    public SubcontractorEntity getSubcontractorById(int id) {
        Optional<SubcontractorEntity> result = subContractorRepository.findById(id);
        return result.orElse(null);
    }

    public SubcontractorEntity getSubcontractorByEmail(String email) {
        return subContractorRepository.findByEmail(email);
    }

    public void deleteSubcontractor(int id) {
        subContractorRepository.deleteById(id);
    }

    public String editDescription(String email, String description) throws SdkClientException {
       try {
           SubcontractorEntity subcontractor = getSubcontractorByEmail(email);
           subcontractor.setSubcontractor_description(description);
           subContractorRepository.save(subcontractor);
       }catch (Exception e) {
           return "Error";
       }
        return description;
    }
}
