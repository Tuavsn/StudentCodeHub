package com.group7.studentcodehub.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.group7.studentcodehub.util.ImageUtil;

@CrossOrigin()
@RestController
@RequestMapping("/api")
public class ImageController {
	
	@Autowired
	private static final String IMAGE_DIR = "photos";
	
	@PostMapping("/images/save")
	public ResponseEntity<java.util.Map<String, Object>> saveImages(
			@RequestPart("images") MultipartFile[] images
	) throws IOException {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		List<String> listImage = ImageUtil.saveImage(images);
		response.put("images", listImage);
		return ResponseEntity.ok(response);
	}
	
	
	@GetMapping("/images/{imageName}")
	public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws MalformedURLException {
		Path imagePath = Paths.get(IMAGE_DIR);
		
		imagePath = imagePath.resolve(imageName);
		
		Resource resouce = new UrlResource(imagePath.toUri());
		
		if(resouce.exists() || resouce.isReadable()) {
			return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resouce);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/images/{imageNames}")
    public ResponseEntity<?> deleteImage(@PathVariable List<String> imageNames) {
        try {
        	for(String imageName : imageNames) {
        		Path imagePath = Paths.get(IMAGE_DIR).resolve(imageName);
        		Files.delete(imagePath);        		
        	}
            return ResponseEntity.ok().build();
        } catch (NoSuchFileException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found", e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image", e);
        }
    }
}
