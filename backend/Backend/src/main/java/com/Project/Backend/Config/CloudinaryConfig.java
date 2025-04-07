package com.Project.Backend.Config;
import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "placaeholder");
        config.put("api_key", "placaeholder");
        config.put("api_secret", "placaeholder");
        return new Cloudinary(config);
    }
}
