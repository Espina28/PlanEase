package com.Project.Backend.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Project.Backend.Entity.UserEntity;
import com.Project.Backend.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final CloudinaryService cloudinaryService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    
    
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, CloudinaryService cloudinaryService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.cloudinaryService = cloudinaryService;
    }

    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    public boolean userExistsByEmail(String Email) {
        return userRepository.findByEmail(Email) != null;
    }

    public List<UserEntity> getAllUsers() { 
        return userRepository.findAll();
    }
    public UserEntity registerUser(UserEntity user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String getUserProfileImage(String email) {
        UserEntity user = userRepository.findByEmail(email);
        return user.getProfilePicture();
    }

    public UserEntity updateUserProfile(String email, MultipartFile file, String firstname, String lastname, String password) throws IOException {
        UserEntity user = userRepository.findByEmail(email);
        
        // Check if a new profile image is provided
        if (file != null && !file.isEmpty()) {
            // Delete the previous image from Cloudinary (if it exists)
            String existingImageUrl = user.getProfilePicture();
            if (existingImageUrl != null && !existingImageUrl.isEmpty()) {
                cloudinaryService.deleteImage(existingImageUrl);
            }
    
            // Upload new image
            String newImageUrl = cloudinaryService.uploadImage(file, "user_profiles");
            user.setProfilePicture(newImageUrl);
        }
    
        // Update other fields if provided
        if (firstname != null && !firstname.isEmpty()) {
            user.setFirstname(firstname);
        }
        if (lastname != null && !lastname.isEmpty()) {
            user.setLastname(lastname);
        }
        if (password != null && !password.isEmpty()) {
            user.setPassword(bCryptPasswordEncoder.encode(password)); // Ensure password is hashed before saving
        }
    
        return userRepository.save(user);
    }

    public boolean loginUser(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);
        
        if (user == null) {
            return false; // User not found
        }
        
        return user.getPassword().equals(password);
    }

    public UserEntity getUserById(int userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }

    public boolean authenticate(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);
        if(!user.getEmail().equals(email)){
            throw new UsernameNotFoundException("User not found");
        }

        if (!bCryptPasswordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return true;
    }
    public UserEntity updateUserInfoByEmail(String email, UserEntity updatedUser) {
        UserEntity existingUser = userRepository.findByEmail(email);
        if (existingUser == null) {
            throw new RuntimeException("User not found with email: " + email);
            }

                existingUser.setFirstname(updatedUser.getFirstname());
                existingUser.setLastname(updatedUser.getLastname());
                existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
                existingUser.setRegion(updatedUser.getRegion());
                existingUser.setProvince(updatedUser.getProvince());
                existingUser.setCityAndMul(updatedUser.getCityAndMul());
                existingUser.setBarangay(updatedUser.getBarangay());

                return userRepository.save(existingUser);
        }
    public void updateUserPassword(String email, String newPassword) {
        UserEntity user = userRepository.findByEmail(email);
            if (user == null) {
                throw new RuntimeException("User not found with email: " + email);
            }

            user.setPassword(bCryptPasswordEncoder.encode(newPassword));
            userRepository.save(user);
    }

    public boolean doesPasswordMatch(String email, String inputPassword) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        System.out.println(inputPassword);
        System.out.println(user.getPassword());
        return bCryptPasswordEncoder.matches(inputPassword, user.getPassword());
    }


}
