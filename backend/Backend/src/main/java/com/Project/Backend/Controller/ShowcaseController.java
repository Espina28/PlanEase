package com.Project.Backend.Controller;

import com.Project.Backend.DTO.ShowcaseDTO;
import com.Project.Backend.Entity.ShowcaseEntity;
import com.Project.Backend.Entity.ShowcaseMediaEntity;
import com.Project.Backend.Repository.ShowcaseRepository;
import com.Project.Backend.Service.ShowcaseMediaService;
import com.Project.Backend.Service.ShowcaseService;
import org.apache.coyote.Response;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/showcase")
public class ShowcaseController {

    @Autowired
    private ShowcaseService showcaseService;
    @Autowired
    private ShowcaseMediaService showcaseMediaService;


    @PostMapping("/create-showcase")
    public ResponseEntity<?> addNewShowcase(@RequestBody ShowcaseDTO showcaseDTO) {
       try {
           ShowcaseEntity showcase = showcaseService.createShowcase(showcaseDTO);
           List<ShowcaseMediaEntity> showcaseMedia = showcaseMediaService.createShowcaseMedia(showcaseDTO.getImageUrls(), showcase.getShowcase_id());
           if (showcase == null) {
               return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to save showcase");
           }
           return ResponseEntity.ok().body(showcase);
       }catch (Exception e){
           return ResponseEntity.badRequest().body(e.getMessage());
       }
    }

    @GetMapping("/getshowcase/{email}")
    public ResponseEntity<?> getShowcaseByServiceName(@PathVariable String email){
        List<ShowcaseEntity> showcase = null;
        try {
            showcase = showcaseService.getAllShowcaseByUserEmail(email);
            if(showcase == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok().body(showcase);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
