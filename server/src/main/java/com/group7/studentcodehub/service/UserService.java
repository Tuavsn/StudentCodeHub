package com.group7.studentcodehub.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.group7.studentcodehub.dto.UpdateInfoDto;
import com.group7.studentcodehub.dto.UserProfileDto;
import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.entities.user_follow;
import com.group7.studentcodehub.repository.UserFollowRepository;
import com.group7.studentcodehub.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserFollowRepository userFollowRepository;
	@Autowired
	JwtService jwtService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public void updateInfo(
			UpdateInfoDto userInfo, 
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
				if(userInfo.getPassword() != null) {
					User.setPassword(passwordEncoder.encode(userInfo.getPassword()));					
				}
				User.setFullName(userInfo.getFullName());
				User.setAvatar(userInfo.getAvatar());
				User.setEmail(userInfo.getEmail());
				User.setGender(userInfo.getGender());
				User.setMobile(userInfo.getMobile());
				userRepository.save(User);
			}
		}
	}
	
	public void followUser(int userId, 
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
				user target = userRepository.getById(userId);
				user_follow newFollow = user_follow.builder()
						.source(User)
						.target(target)
						.build();
				userFollowRepository.save(newFollow);
			}
		}
	}
	
	public void unFollowUser(int userId, 
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
				user target = userRepository.getById(userId);
				user_follow existFollow = userFollowRepository.findBySourceAndTarget(User, target);
				userFollowRepository.delete(existFollow);
			}
		}
	}
	
	public List<UserProfileDto> getSuggestionUsers(
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
//				Lấy danh sách những người bạn đang follow
				List<UserProfileDto> suggestions = new ArrayList<>();
				List<user_follow> following = userFollowRepository.findBySource(User);
				for(user_follow i : following) {
//				Lấy danh sách follower của người bạn đang follow
					List<user_follow> suggestion = userFollowRepository.findByTarget(i.getTarget());
					for(user_follow j : suggestion) {
						if(j.getSource().getId() != User.getId()) {
							UserProfileDto user = UserProfileDto.builder()
									.id(j.getSource().getId())
									.fullName(j.getSource().getFullName())
									.avatar(j.getSource().getAvatar())
									.role(j.getSource().getRole())
									.build();
							if(!suggestions.contains(user)) {
								suggestions.add(user);								
							}
						}
					}
				}
				return suggestions;
			}
		}
		return null;
	}
}
