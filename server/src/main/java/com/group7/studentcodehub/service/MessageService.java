package com.group7.studentcodehub.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.group7.studentcodehub.dto.MessageRecipientDto;
import com.group7.studentcodehub.dto.UserMessageDto;
import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.entities.user_message;
import com.group7.studentcodehub.repository.MessageRepository;
import com.group7.studentcodehub.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class MessageService {
	
	@Autowired
	MessageRepository messageRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	JwtService jwtService;
	ZoneId vietnamZone = ZoneId.of("Asia/Ho_Chi_Minh");
	
	public List<UserMessageDto> getMessageBetweenUser(
			int userId
			, HttpServletRequest request
	) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return null;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				List<UserMessageDto> messages = new ArrayList<>();
				for(Object[] i:messageRepository.findLatestMessages(User.getId(), userId)) {
					UserMessageDto message = new UserMessageDto();
					
					MessageRecipientDto source = new MessageRecipientDto();
					source.setFullName(((user) i[0]).getFullName());
					source.setAvatar(((user) i[0]).getAvatar());
					source.setId(((user) i[0]).getId());
					source.setRole(((user) i[0]).getRole());
					source.setStatus(((user) i[0]).getStatus());
					
					MessageRecipientDto target = new MessageRecipientDto();
					target.setFullName(((user) i[1]).getFullName());
					target.setAvatar(((user) i[1]).getAvatar());
					target.setId(((user) i[1]).getId());
					target.setRole(((user) i[1]).getRole());
					target.setStatus(((user) i[1]).getStatus());
					
					message.setSource(source);
					message.setTarget(target);
					message.setId((int) i[2]); 
					message.setContent((String) i[3]);
					message.setImage((String) i[4]);
					message.setStatus((int) i[5]);
					message.setCreateAt((LocalDateTime) i[6]);
					messages.add(message);
				}
				
				return messages;			
			}
		}	
		return null;
	}
	
	public List<MessageRecipientDto> getAllMessages(HttpServletRequest request) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return null;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				List<MessageRecipientDto> recipients = new ArrayList<>();
				for(Integer i:messageRepository.findAllMessages(User.getId())) {
					user recipient = userRepository.getById(i);
					MessageRecipientDto recipientDto = MessageRecipientDto.builder()
							.id(recipient.getId())
							.fullName(recipient.getFullName())
							.avatar(recipient.getAvatar())
							.status(recipient.getStatus())
							.build();
					recipients.add(recipientDto);
				}
				
				return recipients;		
			}
		}	
		return null;
	}
	
	public UserMessageDto createMessage(UserMessageDto message, HttpServletRequest request) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return null;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				user recipient = userRepository.getById(message.getTarget().getId());
				user_message newMessage = user_message.builder()
						.source(User)
						.target(recipient)
						.content(message.getContent())
						.image(message.getImage())
						.createAt(LocalDateTime.now(vietnamZone))
						.build();
				
				messageRepository.save(newMessage);
				
				MessageRecipientDto source = MessageRecipientDto.builder()
						.id(User.getId())
						.fullName(User.getFullName())
						.avatar(User.getAvatar())
						.role(User.getRole())
						.status(User.getStatus())
						.build();
				
				MessageRecipientDto target = MessageRecipientDto.builder()
						.id(newMessage.getTarget().getId())
						.fullName(newMessage.getTarget().getFullName())
						.avatar(newMessage.getTarget().getAvatar())
						.role(newMessage.getTarget().getRole())
						.status(newMessage.getTarget().getStatus())
						.build();
				
				UserMessageDto responseMessage = UserMessageDto.builder()
						.id(newMessage.getId())
						.source(source)
						.target(target)
						.content(newMessage.getContent())
						.image(newMessage.getImage())
						.createAt(newMessage.getCreateAt())
						.build();
				return responseMessage;
			}
		}	
		return null;
	}
	
	public void updateMessageStatus(List<UserMessageDto> messages, HttpServletRequest request) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return ;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				for(UserMessageDto i : messages) {
					user_message message = messageRepository.getById(i.getId());
					message.setStatus(i.getStatus());
					messageRepository.save(message);
				}
			}
		}	
	}
}
