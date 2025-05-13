package com.Project.Backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Project.Backend.Entity.SubcontractorEntity;
import com.Project.Backend.Repository.SubContractorRepository;

@Service
public class SubcontractorService {

    @Autowired
    private SubContractorRepository subcontractorRepository;

    public SubcontractorEntity saveSubcontractor(SubcontractorEntity subcontractor) {
        return subcontractorRepository.save(subcontractor);
    }

    public List<SubcontractorEntity> getAllSubcontractors() {
        return subcontractorRepository.findAll();
    }

    public SubcontractorEntity getSubcontractorById(int id) {
        Optional<SubcontractorEntity> result = subcontractorRepository.findById(id);
        return result.orElse(null);
    }

    public void deleteSubcontractor(int id) {
        subcontractorRepository.deleteById(id);
    }

}
