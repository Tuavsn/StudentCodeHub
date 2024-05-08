package com.group7.studentcodehub.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.repository.LikeRepository;
import com.group7.studentcodehub.repository.PostCommentRepository;
import com.group7.studentcodehub.repository.PostRepository;
import com.group7.studentcodehub.repository.UserRepository;

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
//	@Autowired
//	private UserFollowRepository userFollowRepository;
	
//	@GetMapping("/get_all_users")
//	public ResponseEntity<List<user>> getAllUserFollows() {
//		List<user> userFollows = userRepository.findAllUser();
//		return ResponseEntity.ok(userFollows);
//	}
	
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
	
//	@GetMapping("/get_total_spam_posts")
//	public ResponseEntity<Long> getAllPosts() {
//		long total_posts = postRepository.count();
//		return ResponseEntity.ok(total_posts);
//	}
//	
//	@GetMapping("/get_spam_posts")
//	
//	@GetMapping("/delete_spam_posts/{id}")
//	public ResponseEntity<String> 
}
