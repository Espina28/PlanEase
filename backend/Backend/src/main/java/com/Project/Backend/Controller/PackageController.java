package com.Project.Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Project.Backend.Entity.PackageEntity;
import com.Project.Backend.Service.PackageService;


@RestController
@RequestMapping("/packages")
public class PackageController {


    @Autowired
    private PackageService packageService;

    @PostMapping
    public PackageEntity createPackage(@RequestBody PackageEntity packageEntity) {
        return packageService.savePackage(packageEntity);
    }

    @GetMapping
    public List<PackageEntity> getAllPackages() {
        return packageService.getAllPackages();
    }

    @GetMapping("/{id}")
    public PackageEntity getPackageById(@PathVariable Long id) {
        return packageService.getPackageById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
    }
}
