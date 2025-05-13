package com.Project.Backend.Service;

import com.Project.Backend.Entity.RegularUserEntity;
import com.Project.Backend.Repository.RegularUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegularUserService {

    @Autowired
    private RegularUserRepository regularUserRepository;

    public RegularUserEntity saveRegularUser(RegularUserEntity regularUser) {
        return regularUserRepository.save(regularUser);
    }

    public List<RegularUserEntity> getAllRegularUsers() {
        return regularUserRepository.findAll();
    }

    public RegularUserEntity getRegularUserById(int id) {
        Optional<RegularUserEntity> result = regularUserRepository.findById(id);
        return result.orElse(null);
    }

    public RegularUserEntity updateRegularUser(int id, RegularUserEntity updatedUser) {
        Optional<RegularUserEntity> optionalUser = regularUserRepository.findById(id);
        if (optionalUser.isPresent()) {
            RegularUserEntity existingUser = optionalUser.get();
            existingUser.setUser(updatedUser.getUser()); // update fields as necessary
            return regularUserRepository.save(existingUser);
        } else {
            return null;
        }
    }

    public void deleteRegularUser(int id) {
        regularUserRepository.deleteById(id);
    }
}
