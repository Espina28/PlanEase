package com.Project.Backend.Service;

import com.Project.Backend.Entity.ServiceOfferedEntity;
import com.Project.Backend.Repository.ServiceOfferedRepository;
import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceOfferedService {

    @Autowired
    private ServiceOfferedRepository serviceOfferedRepository;


//    public ServiceOfferedService create(ServiceOfferedEntity newServiceOffered) {
//        ServiceOfferedEntity serviceOffered = null;
//        try {
//            serviceOffered = serviceOfferedRepository.findByServiceByName(newServiceOffered.getServiceOffered_name());
//            if(serviceOffered != null){
//                return null;
//            }
//            serviceOffered = serviceOfferedRepository.save(newServiceOffered);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to create Service Offered");
//        }
//    }

    public ServiceOfferedEntity readById(int id) {
        return serviceOfferedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service Offered not found"));
    }

//    public ServiceOfferedEntity updateServiceOffered(ServiceOfferedEntity newServiceOffered) {
//        ServiceOfferedEntity oldServiceOffered = null;
//        try{
//            oldServiceOffered = serviceOfferedRepository.findById(newServiceOffered.getOfferingService_id())
//                            .orElseThrow(() -> new IllegalArgumentException("Service Offered not found"));
//
//            oldServiceOffered.setOfferingService_name(newServiceOffered.getOfferingService_name());
//            oldServiceOffered.setOfferingService_price(newServiceOffered.getOfferingService_price());
//        }catch (Exception e){
//            throw new RuntimeException(e.getMessage());
//        }
//    }

    public String deleteServiceOffered(int id) {
        String message = null;
        ServiceOfferedEntity serviceOffered = null;
        try{
            serviceOffered = serviceOfferedRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Service Offered not found"));

            serviceOfferedRepository.deleteById(id);
            message = "Service Offered deleted successfully";
            return message;
        }catch (Exception e){
            return e.getMessage();
        }
    }

    public List<ServiceOfferedEntity> getAllOfferedService(){
        return serviceOfferedRepository.findAll();
    }

    public ServiceOfferedEntity findByServiceByName(String serviceName){
        return serviceOfferedRepository.findByServiceByName(serviceName);
    }

}
