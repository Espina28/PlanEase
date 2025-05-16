//package com.Project.Backend.Controller;
//
//import com.Project.Backend.Entity.ServiceOfferingEntity;
//import com.Project.Backend.Service.ServiceOfferingService;
//import org.apache.coyote.Response;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/serviceoffering")
//public class ServiceOfferingController {
//
//    @Autowired
//    private ServiceOfferingService serviceOfferingService;
//
//    @GetMapping("/get-service-offered")
//    public ResponseEntity<?> getServiceOffered(@RequestParam String email) {
//        ServiceOfferingEntity serviceOffered = null;
//        try {
//            serviceOffered = serviceOfferingService.getServiceOffered(email);
//            if(serviceOffered == null) {
//                return ResponseEntity.notFound().build();
//            }
//            return ResponseEntity.ok().body(serviceOffered);
//        }catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//}


//THIS CLASS WILL BE DELETED SOOON <-----------------------------
