package com.group7.studentcodehub.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.group7.studentcodehub.dto.UserMessageDto;
import com.group7.studentcodehub.entities.post;
import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.entities.notify;

@RestController
public class SocketController {
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	private Map<String, user> activeUsers = new HashMap<>();
	
	@MessageMapping("/activeUser")
	public void userLoginNotify(@Payload user user, 
			SimpMessageHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		if(!activeUsers.containsValue(user)) {	
			activeUsers.put(sessionId, user);
			simpMessagingTemplate.convertAndSend(
					"/notify/activeUser"
					, activeUsers.values());
		}
	}
	
	@EventListener
	public void userLogoutNotify(SessionDisconnectEvent event) {
        String disconnectedUser = event.getSessionId();
        activeUsers.remove(disconnectedUser);
        simpMessagingTemplate.convertAndSend("/notify/activeUser", 
        		activeUsers.values());
    }
	
	@MessageMapping("/comment")
	public void getComment(@Payload post userPost) {
		simpMessagingTemplate.convertAndSend("/comment", userPost);
	}
	
	@MessageMapping("/like")
	public void getLike(@Payload post userPost) {
		simpMessagingTemplate.convertAndSend("/like", userPost);
	}
	
	@MessageMapping("/message")
	public void receiveMessage(@Payload UserMessageDto message) {
		simpMessagingTemplate.convertAndSendToUser(String.valueOf(message.getTarget().getId()), "/message", message);
	}
	
	@MessageMapping("/notify")
	public void receiveNotify(@Payload notify notify) {
		simpMessagingTemplate.convertAndSendToUser(String.valueOf(notify.getTarget().getId()), "/notify", notify);
	}
}
