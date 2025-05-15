package com.Project.Backend.Controller;

import com.Project.Backend.DTO.ShowcaseDTO;
import com.Project.Backend.Entity.ShowcaseEntity;
import com.Project.Backend.Repository.ShowcaseRepository;
import com.Project.Backend.Service.ShowcaseService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/create-showcase")
    public ResponseEntity<?> addNewShowcase(@RequestBody ShowcaseDTO showcaseDTO) {
       try {
           ShowcaseEntity showcase = showcaseService.createShowcase(showcaseDTO);
           if(showcase == null) {
               return ResponseEntity.notFound().build();
           }
           return ResponseEntity.ok().body(showcase);
       }catch (Exception e){
           return ResponseEntity.badRequest().body(e.getMessage());
       }
    }

    @GetMapping("/get-showcase/{email}")
    public ResponseEntity<?> getShowcaseByServiceName(@PathVariable String email){
        List<ShowcaseEntity> showcase = null;
        try {
            showcase = showcaseService.getShowcaseByServiceName(email);
            if(showcase == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok().body(showcase);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
