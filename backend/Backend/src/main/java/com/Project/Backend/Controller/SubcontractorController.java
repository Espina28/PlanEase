package com.Project.Backend.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Project.Backend.DTO.CreateSubcontractorRequest;
import com.Project.Backend.Entity.SubcontractorEntity;
import com.Project.Backend.Service.SubcontractorService;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/subcontractor")
public class SubcontractorController {

    @Autowired
    private SubcontractorService subcontractorService;

    @GetMapping("/getall")
    public ResponseEntity<List<SubcontractorEntity>> getAllSubcontractors() {
        return ResponseEntity.ok(subcontractorService.getAllSubcontractors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubcontractorEntity> getSubcontractorById(@PathVariable int id) {
        SubcontractorEntity subcontractor = subcontractorService.getSubcontractorById(id);
        return ResponseEntity.ok(subcontractor);
    }

    @GetMapping("/generate-PresignedUrl")
    public ResponseEntity<?> generatePresignedURL(
            @RequestParam("file_name") String fileName,
            @RequestParam("user_name") String userName){
        String uuidName = java.util.UUID.randomUUID() + "_" + fileName;

        try{
            String presignedURL = subcontractorService.generatePresignedUrl(userName,uuidName);
            return ResponseEntity.ok(Map.of("presignedURL", presignedURL, "uuidName", uuidName));
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }
    }


    @PostMapping("/create")
    public ResponseEntity<SubcontractorEntity> createSubcontractor(@RequestBody CreateSubcontractorRequest request) {
        SubcontractorEntity subcontractor = new SubcontractorEntity();
        subcontractor.setUser(request.getUser());
        subcontractor.setService(request.getService());

        SubcontractorEntity savedSubcontractor = subcontractorService.saveSubcontractor(subcontractor);
        return ResponseEntity.ok(savedSubcontractor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubcontractor(@PathVariable int id) {
        subcontractorService.deleteSubcontractor(id);
        return ResponseEntity.noContent().build();
    }
}
