package com.group7.studentcodehub.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.group7.studentcodehub.dto.MessageRecipientDto;
import com.group7.studentcodehub.dto.UserMessageDto;
import com.group7.studentcodehub.service.MessageService;
import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin()
@RestController
@RequestMapping("/api")
public class MessageController {
	
	@Autowired
	MessageService messageService;
	
	@GetMapping("/message/{receivedId}")
	public ResponseEntity<java.util.Map<String , Object>> getMessageBetweenUser(
			@PathVariable("receivedId") int receivedId,
			HttpServletRequest request
	) throws IOException, Exception {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		List<UserMessageDto> messages = messageService.getMessageBetweenUser(receivedId, request);
		response.put("messages", messages);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/messages")
	public ResponseEntity<java.util.Map<String , Object>> getMessageBetweenUser( HttpServletRequest request ) 
			throws IOException, Exception 
	{
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		List<MessageRecipientDto> recipients = messageService.getAllMessages(request);
		response.put("recipients", recipients);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/message")
	public ResponseEntity<UserMessageDto> createMessage(
			@RequestBody UserMessageDto message,
			HttpServletRequest request
	) throws IOException, Exception {
		UserMessageDto newMessage = messageService.createMessage(message, request);
		return ResponseEntity.ok(newMessage);
	}
	
	@RequestMapping(value = "/message", method= RequestMethod.PATCH)
	public void updateMessageStatus(
			@RequestBody List<UserMessageDto> messages,
			HttpServletRequest request
	) throws IOException, Exception {
		messageService.updateMessageStatus(messages, request);
	}
}
