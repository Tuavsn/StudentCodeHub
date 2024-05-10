package com.group7.studentcodehub.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.group7.studentcodehub.dto.UserProfileDto;
import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.repository.LikeRepository;
import com.group7.studentcodehub.repository.PostCommentRepository;
import com.group7.studentcodehub.repository.PostRepository;
import com.group7.studentcodehub.repository.UserRepository;
import com.group7.studentcodehub.service.AdminService;
import com.group7.studentcodehub.service.PostService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin
public class AdminController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private PostCommentRepository commentRepository;
	@Autowired
	private LikeRepository likeRepository;
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/get_total_users")
	public ResponseEntity<List<user>> getTotalUsers() {
		List<user> total_users = userRepository.findAll();
		return ResponseEntity.ok(total_users);
	}
	
	@GetMapping("/get_total_posts")
	public ResponseEntity<Long> getTotalPosts() {
		long total_posts = postRepository.count();
		return ResponseEntity.ok(total_posts);
	}
	
	@GetMapping("/get_total_comments")
	public ResponseEntity<Long> getTotalComments() {
		long total_comments = commentRepository.count();
		return ResponseEntity.ok(total_comments);
	}
	
	@GetMapping("/get_total_likes")
	public ResponseEntity<Long> getTotalLikes() {
		long total_likes = likeRepository.count();
		return ResponseEntity.ok(total_likes);
	}
	
	@RequestMapping(value = "/user/{userId}/block", method= RequestMethod.PATCH)
	public ResponseEntity<java.util.Map<String, Object>> blockUser(
			@PathVariable("userId") int userId
	) {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		adminService.blockUser(userId);
		response.put("message", "Block thành công");
		return ResponseEntity.ok(response);
	}
	
	@RequestMapping(value = "/user/{userId}/unBlock", method= RequestMethod.PATCH)
	public ResponseEntity<java.util.Map<String, Object>> unBlockUser(
			@PathVariable("userId") int userId
	) {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		adminService.unBlockUser(userId);
		response.put("message", "Unblock thành công");
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/dashboard")
	public ResponseEntity<Object> getDashBoard() {
		return ResponseEntity.ok(adminService.getDashBoard());
	}

}
