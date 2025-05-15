package com.Project.Backend.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name = "packages")
public class PackageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int package_id;

    private String package_name;
    private String package_inclusion;
    private double package_price;

   
    public int getId() {
        return package_id;
    }

    public void setId(int package_id) {
        this.package_id = package_id;
    }

    public String getName() {
        return package_name;
    }

    public void setName(String package_name) {
        this.package_name = package_name;
    }

    public String getInclusion() {
        return package_inclusion;
    }

    public void setInclusion(String package_inclusion) {
        this.package_inclusion = package_inclusion;
    }

    public double getPrice() {
        return package_price;
    }

    public void setPrice(double package_price) {
        this.package_price = package_price;
    }

}
