package com.Project.Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Project.Backend.Entity.RegularUserEntity;
import com.Project.Backend.Entity.UserEntity;
import com.Project.Backend.Service.RegularUserService;

@RestController
@RequestMapping("/regularuser")
@CrossOrigin(origins = "http://localhost:5173")
public class RegularUserController {

    @Autowired
    private RegularUserService regularUserService;

    @PostMapping("/create")
    public ResponseEntity<RegularUserEntity> createRegularUser(@RequestBody UserEntity user) {
        RegularUserEntity regularUser = new RegularUserEntity(user);
        RegularUserEntity savedRegularUser = regularUserService.saveRegularUser(regularUser);
        return ResponseEntity.ok(savedRegularUser);
    }
}
