package com.Project.Backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;

    private String firstname;

    private String lastname;

    private String email;

    private String password;

    private String phoneNumber;

    private String region;

    private String province;

    private String cityAndMul;

    private String barangay;

    private String role;

    private String profilePicture;

    private Boolean isGoogle;

    private Boolean isFacebook;

    public UserEntity() {
    }

    public UserEntity( String firstname, String lastname, String email, String password, String phoneNumber,String region ,String province ,
    String cityAndMul ,String barangay, String role, String profilePicture, Boolean isGoogle, Boolean isFacebook) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.region = region;
        this.province = province;
        this.cityAndMul = cityAndMul;
        this.barangay = barangay;
        this.role = role;
        this.profilePicture = profilePicture;
        this.isGoogle = isGoogle;
        this.isFacebook = isFacebook;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Boolean getIsGoogle() {
        return isGoogle;
    }

    public void setIsGoogle(Boolean isGoogle) {
        this.isGoogle = isGoogle;
    }

    public Boolean getIsFacebook() {
        return isFacebook;
    }

    public void setIsFacebook(Boolean isFacebook) {
        this.isFacebook = isFacebook;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCityAndMul() {
        return cityAndMul;
    }

    public void setCityAndMul(String cityAndMul) {
        this.cityAndMul = cityAndMul;
    }

    public String getBarangay() {
        return barangay;
    }

    public void setBarangay(String barangay) {
        this.barangay = barangay;
    }

    

    

    
    
    

    
}
