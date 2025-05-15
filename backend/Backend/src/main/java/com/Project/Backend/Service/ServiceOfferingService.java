package com.Project.Backend.Service;

import com.Project.Backend.Entity.ServiceOfferingEntity;
import com.Project.Backend.Entity.SubcontractorEntity;
import com.Project.Backend.Repository.ServiceOfferingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceOfferingService {
    @Autowired
    private ServiceOfferingRepository serviceOfferingRepository;

    @Autowired
    private SubcontractorService subcontractorService;

    public ServiceOfferingEntity saveServiceOffering(ServiceOfferingEntity serviceOffering) {
        serviceOffering.setServiceOffering_is_active(true);
        return serviceOfferingRepository.save(serviceOffering);
    }

    public ServiceOfferingEntity getServiceOffered(String email) {
       try{
           ServiceOfferingEntity serviceOffered = serviceOfferingRepository.findServiceOfferingByUserEmail(email);
           if (serviceOffered == null) {
               throw new RuntimeException("Service Offering not exists");
           }
           return serviceOffered;
       }catch(Exception e){
           throw new RuntimeException("Service Offering not found");
       }
    }

    public ServiceOfferingEntity getServiceOfferingById(int id) {
        return serviceOfferingRepository.findById(id).orElse(null);
    }

}
