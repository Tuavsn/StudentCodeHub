package com.group7.studentcodehub.util;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;


public class ImageUtil {
	
	private static String uploadDir = "photos";
	
	public static List<String> saveImage(MultipartFile[] files) throws IOException {
		List<String> uniqueFileNames = new ArrayList<>();
		
		Path uploadPath = Paths.get(uploadDir);
		
		if(!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}
		
		for(MultipartFile file : files) {
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			
			try (InputStream inputStream = file.getInputStream()) {
				String uniqueFileName = generateUniqueFileName(fileName);
				Path filePath = uploadPath.resolve(uniqueFileName);
				Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
				uniqueFileNames.add(uniqueFileName);
			} catch (IOException ioe) {
				throw new IOException("Không thể lưu hình ảnh: " + fileName, ioe);
			}
			
		}
		
		return uniqueFileNames;
	}
	
	private static String generateUniqueFileName(String fileName) {
	    String[] parts = fileName.split("\\.");
	    String extension = parts[parts.length - 1];
	    String uniqueID = UUID.randomUUID().toString();
	    return "image_" + uniqueID + "." + extension;
	}
}
