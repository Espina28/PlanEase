package com.Project.Backend.Service;

import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Utilities;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;

@Component
public class S3Service {

    private final String BUCKET_NAME = "academics-bucket"; // Change this
    private final String BUCKET_KEY = "System-Integ/";
    private S3Client s3;

    private S3Service() {
        if (s3 == null) {
            s3 = S3Client.builder()
                    .region(Region.AP_SOUTHEAST_1)
                    .credentialsProvider(StaticCredentialsProvider.create(
                            AwsBasicCredentials.create(
                                    "secret1",
                                   "secret2"
                            )
                    ))
                    .build();
        }
    }

    public String upload(File file, String folderPath, String fileName) {
        try {
            String s3Key = BUCKET_KEY + folderPath + java.util.UUID.randomUUID() + "_" + fileName;

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(s3Key)
                    .contentType(getContentType(fileName))
                    .build();

            // Step 3: Upload the file to S3
            s3.putObject(request, RequestBody.fromFile(file));

            // Step 4: Get the Object URL using AWS SDK's S3Utilities
            S3Utilities s3Utilities = s3.utilities();
            String objectUrl = s3Utilities.getUrl(builder ->
                    builder.bucket(BUCKET_NAME).key(s3Key)
            ).toString();

            return objectUrl;
        } catch (Exception e) {
            System.out.println("Error occurred while uploading the file to S3: " + e.getMessage());
            throw new RuntimeException("Error occurred while uploading the file to S3: " + e.getMessage(), e);
        }
    }

    public String getImage(String s3Key, String imagePath) {
        try {
            String fullS3Key = BUCKET_KEY + imagePath + "/" + s3Key;

            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(fullS3Key)
                    .build();

            S3Utilities s3Utilities = s3.utilities();
            String objectUrl = s3Utilities.getUrl(builder ->
                    builder.bucket(BUCKET_NAME).key(fullS3Key)
            ).toString();

            return objectUrl; // Return the URL of the image
        } catch (Exception e) {
            System.err.println("Error fetching image: " + e.getMessage());
            return null; // Or handle error appropriately
        }
    }

    // Get Content Type Based on File Extension
    private static String getContentType(String fileName) {
        if (fileName.endsWith(".png")) {
            return "image/png";
        } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (fileName.endsWith(".gif")) {
            return "image/gif";
        } else {
            return "application/octet-stream"; // Default if unknown
        }
    }
}
