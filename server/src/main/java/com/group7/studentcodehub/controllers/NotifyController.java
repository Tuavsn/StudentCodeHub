package com.group7.studentcodehub.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.group7.studentcodehub.dto.NotifyDto;
import com.group7.studentcodehub.entities.notify;
import com.group7.studentcodehub.repository.NotifyRepository;
import com.group7.studentcodehub.service.NotifyService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class NotifyController {
	@Autowired
	NotifyService notifyService;
	@Autowired
	NotifyRepository notifyRepository;
	
	@GetMapping("/notify")
	public ResponseEntity<List<notify>> getAllNotifies(HttpServletRequest request) 
			throws IOException, Exception 
	{
		return ResponseEntity.ok(notifyService.getAllNotify(request));
	}
	
	@PostMapping("/notify")
	public ResponseEntity<notify> createNotify(
			@RequestBody NotifyDto notify, 
			HttpServletRequest request
	) throws IOException, Exception {
		return ResponseEntity.ok(notifyService.createNotify(notify, request));
	}
	
	@RequestMapping(value = "/notify", method= RequestMethod.PATCH)
	public void updateNotifyStatus(
			@RequestBody notify notify,
			HttpServletRequest request
	) throws IOException, Exception {
		notifyService.updateNotifyStatus(notify, request);
	}
	
	@DeleteMapping("/notify/{notifyId}")
	public ResponseEntity<java.util.Map<String, Object>> deleteNotify(
			@PathVariable("notifyId") int notifyId,
			HttpServletRequest request
	) throws IOException, Exception {
		notifyService.deleteNotify(notifyId, request);
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		response.put("msg", "Success");
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/notifies")
	public ResponseEntity<java.util.Map<String, Object>> deleteAllNotifies(
			HttpServletRequest request
	) throws IOException, Exception {
		notifyService.deleteAllNotifies(request);
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		response.put("msg", "Success");
		return ResponseEntity.ok(response);
	}
}
