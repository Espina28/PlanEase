package com.Project.Backend.Service;
import com.Project.Backend.Entity.PackageEntity;
import com.Project.Backend.Repository.PackageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageService {
@Autowired
    private PackageRepository packageRepository;

    public PackageEntity savePackage(PackageEntity packageEntity) {
        return packageRepository.save(packageEntity);
    }

    public List<PackageEntity> getAllPackages() {
        return packageRepository.findAll();
    }

    public PackageEntity getPackageById(Long id) {
        return packageRepository.findById(id).orElse(null);
    }

    public void deletePackage(Long id) {
        packageRepository.deleteById(id);
    }
}
