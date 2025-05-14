package com.Project.Backend.Service;

import com.Project.Backend.Repository.ShowcaseMediaRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.exception.SdkClientException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class ShowcaseMediaService {
    @Autowired
    private ShowcaseMediaRepository showcaseMediaRepository;

    @Autowired
    private S3Service s3Service;
    private static final String UPLOAD_DIR = "Backend/uploads/";


    public String generatePresignedUrl(String userName,String uuidName) {
        try {
            return s3Service.generatePresignedUploadUrl(userName+"/" ,uuidName);
        }catch (SdkClientException e){
            throw new RuntimeException("Error in creating presigned URL");
        }
    }

    public String uploadChunk(String uuidName, long size,
                              int currentChunkIndex,
                              int totalChunks,
                              HttpServletRequest request,
                              String directory
    ) throws IOException {
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        File outputFile = new File(uploadDir, uuidName);

        try (InputStream inputStream = request.getInputStream();
             FileOutputStream fos = new FileOutputStream(outputFile, true)) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
        }

        if (currentChunkIndex == totalChunks - 1) {
            // Final chunk received, upload to S3 and delete local file
            String imageUrl = s3Service.upload(outputFile,directory , uuidName);
            // Clean up local file after upload
            outputFile.delete();
            return imageUrl;
        }

        return null; // Waiting for more chunks
    }

}
