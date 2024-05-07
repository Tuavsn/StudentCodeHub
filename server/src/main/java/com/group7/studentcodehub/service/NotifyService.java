package com.group7.studentcodehub.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.group7.studentcodehub.dto.NotifyDto;
import com.group7.studentcodehub.entities.notify;
import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.repository.NotifyRepository;
import com.group7.studentcodehub.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

@Service
public class NotifyService {
	
	@Autowired
	NotifyRepository notifyRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	JwtService jwtService;
	ZoneId vietnamZone = ZoneId.of("Asia/Ho_Chi_Minh");
	
	public List<notify> getAllNotify(HttpServletRequest request) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return null;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				List<notify> notifies = notifyRepository.findAllByTarget(User);
				return notifies;
			}
		}
		return null;
	}
	
	public notify createNotify(
			NotifyDto Notify, 
			HttpServletRequest request
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
				var Target = userRepository.findById(Notify.getTarget().getId()).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
				notify newNotify = notify.builder()
						.source(User)
						.target(Target)
						.content(Notify.getContent())
						.link(Notify.getLink())
						.status(0)
						.createAt(LocalDateTime.now(vietnamZone))
						.build();
				notifyRepository.save(newNotify);	
				return newNotify;
			}
		}
		return null;
	}
	
	public void updateNotifyStatus(
			notify notify,
			HttpServletRequest request
	) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return ;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				notify newNotify = notifyRepository.getById(notify.getId());
				newNotify.setStatus(notify.getStatus());
				notifyRepository.save(newNotify);
			}
		}
	}
	
	public void deleteNotify(
			int notifyId, 
			HttpServletRequest request
	) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return ;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				notifyRepository.deleteById(notifyId);
			}
		}
	}
	
	@Transactional
	public void deleteAllNotifies(
			HttpServletRequest request
	) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return ;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				notifyRepository.deleteAllByTarget(User);
			}
		}
	}
}
