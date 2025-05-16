package com.Project.Backend.Service;

import com.Project.Backend.DTO.CreateShowcaseMedia;
import com.Project.Backend.DTO.ShowcaseDTO;
import com.Project.Backend.Entity.ShowcaseEntity;
import com.Project.Backend.Entity.ShowcaseMediaEntity;
import com.Project.Backend.Repository.ShowcaseMediaRepository;
import com.Project.Backend.Repository.ShowcaseRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.exception.SdkClientException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShowcaseMediaService {
    @Autowired
    private ShowcaseMediaRepository showcaseMediaRepository;

    @Autowired
    @Lazy
    private ShowcaseService showcaseService;

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

    //this is for the video
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
            String imageUrl = s3Service.upload(outputFile,directory , uuidName);
            outputFile.delete();
            return imageUrl;
        }

        return null; // Waiting for more chunks
    }

    public List<ShowcaseMediaEntity> createShowcaseMedia(ShowcaseMediaEntity[] showcaseMediaEntity, int showcaseId) {
        List<ShowcaseMediaEntity> savedMedia = new ArrayList<>();
        try {
            ShowcaseEntity showcase = showcaseService.findShowcaseById(showcaseId);
            for (ShowcaseMediaEntity media : showcaseMediaEntity) {
                ShowcaseMediaEntity newMedia = new ShowcaseMediaEntity();
                newMedia.setShowcaseMedia_imageurl(media.getShowcaseMedia_imageurl());
                newMedia.setShowcaseMedia_fileName(media.getShowcaseMedia_fileName());
                newMedia.setShowcaseEntity(showcase);
                savedMedia.add(showcaseMediaRepository.save(newMedia));
            }
            return savedMedia;
        } catch (Exception e) {
            throw new RuntimeException("Error creating showcase media: " + e.getMessage());
        }
    }

//    public String updateShowcaseMedia(CreateShowcaseMedia createShowcaseMedia) {
//        ShowcaseMediaEntity newShowcaseMedia = new ShowcaseMediaEntity();
//        try {
//            ShowcaseEntity showcase = showcaseService.findShowcaseById(createShowcaseMedia.getShowcase_id());
//            if(showcase == null){
//                throw new RuntimeException("Showcase not found with id: " + createShowcaseMedia.getShowcase_id());
//            }
//            newShowcaseMedia.setShowcaseMedia_imageurl(createShowcaseMedia.getImageUrl());
//            newShowcaseMedia.setShowcaseMedia_fileName(createShowcaseMedia.getFileName());
//            newShowcaseMedia.setShowcaseEntity(showcase);
//            showcaseMediaRepository.save(newShowcaseMedia);
//            return createShowcaseMedia.getImageUrl();
//        }catch (Exception e){
//            throw new RuntimeException("Error in saving showcase media");
//        }
//    }


    public List<ShowcaseMediaEntity> getShowcaseMediaByShowcaseTitle(String showcaseTitle) {
        return showcaseMediaRepository.findByShowcaseMediaByShowcaseTitle(showcaseTitle);
    }

}
