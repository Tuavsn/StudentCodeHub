package com.group7.studentcodehub.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group7.studentcodehub.dto.UpdateInfoDto;
import com.group7.studentcodehub.dto.UserProfileDto;
import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.entities.user_follow;
import com.group7.studentcodehub.repository.UserFollowRepository;
import com.group7.studentcodehub.repository.UserRepository;
import com.group7.studentcodehub.service.UserService;
import jakarta.servlet.http.HttpServletRequest;


@CrossOrigin()
@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserService userService;
	@Autowired
	UserFollowRepository userFollowRepository;
	
	@PostMapping("/user/updateInfo")
	public ResponseEntity<java.util.Map<String, Object>> updateUserInfo(
			@RequestBody UpdateInfoDto userInfo,
			HttpServletRequest request
	) throws IOException, Exception {
		System.out.println(userInfo.getAvatar());
		userService.updateInfo(userInfo, request);
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		response.put("msg", "Cập nhật thông tin thành công !!!");
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<UserProfileDto> getUserDetail(@PathVariable("userId") int userId) {
		Optional<user> User = userRepository.findById(userId);
		List<user_follow> followers= userFollowRepository.findByTarget(User);
		List<user_follow> following = userFollowRepository.findBySource(User);
		UserProfileDto response = UserProfileDto.builder()
			.fullName(User.get().getFullName())
			.email(User.get().getEmail())
			.avatar(User.get().getAvatar())
			.gender(User.get().getGender())
			.mobile(User.get().getMobile())
			.address(User.get().getAddress())
			.followers(followers)
			.following(following)
			.status(User.get().getStatus())
			.build();
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/user/{userId}/follow")
	public ResponseEntity<java.util.Map<String, Object>> followUser(
			@PathVariable("userId") int userId,
			HttpServletRequest request 
	) throws IOException, Exception {
		userService.followUser(userId, request);
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		response.put("msg", "Follow thành công");
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/user/{userId}/unFollow")
	public ResponseEntity<java.util.Map<String, Object>> unFollowUser(
			@PathVariable("userId") int userId,
			HttpServletRequest request 
	) throws IOException, Exception {
		userService.unFollowUser(userId, request);
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		response.put("msg", "Unfollow thành công");
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/user/search/{userFullName}")
	public ResponseEntity<List<UserProfileDto>> searchUser(
			@PathVariable("userFullName") String userFullName) 
	{
		List<UserProfileDto> searchResult = new ArrayList<>();
		List<user> searchUser = userRepository.findUserByFullNameLike(userFullName);
		for(user i : searchUser) {
			UserProfileDto user = UserProfileDto.builder()
					.id(i.getId())
					.fullName(i.getFullName())
					.avatar(i.getAvatar())
					.gender(i.getGender())
					.role(i.getRole())
					.build();
			searchResult.add(user);
		}
		return ResponseEntity.ok(searchResult);
	}
	
	@GetMapping("/user/suggestion")
	public ResponseEntity<List<UserProfileDto>> searchUser(
			HttpServletRequest request
	) throws IOException, Exception {
		return ResponseEntity.ok(userService.getSuggestionUsers(request));
	}
}
