package com.group7.studentcodehub.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group7.studentcodehub.dto.PostCommentDto;
import com.group7.studentcodehub.entities.post_comment;
import com.group7.studentcodehub.service.PostService;
import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin()
@RestController
@RequestMapping("/api")
@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
public class CommentController {
	@Autowired
	private PostService postService;
	
	@PostMapping("/comment")
	public ResponseEntity<java.util.Map<String, Object>> createPostComment(
			@RequestBody PostCommentDto comment, 
			HttpServletRequest request
	) throws IOException, Exception {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		post_comment newComment = postService.createComment(
				Integer.parseInt(comment.getPostId())
				, comment.getContent()
				, request);
		response.put("msg", "Success");
		response.put("newComment", newComment);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/comment/{commentId}")
	public ResponseEntity<java.util.Map<String, Object>> deletePostComment(
			@PathVariable int commentId, 
			HttpServletRequest request
	) throws IOException, Exception {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		postService.deleteComment(
				commentId
				, request);
		response.put("msg", "Success");
		return ResponseEntity.ok(response);
	}
	
}
