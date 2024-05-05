package com.group7.studentcodehub.controllers;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.group7.studentcodehub.dto.PostDto;
import com.group7.studentcodehub.entities.post;
import com.group7.studentcodehub.repository.PostRepository;
import com.group7.studentcodehub.service.PostService;
import jakarta.servlet.http.HttpServletRequest;


@CrossOrigin()
@RestController
@RequestMapping("/api")
@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
public class PostController {
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private PostService postService;
	
	@PostMapping("/posts")
	public ResponseEntity<java.util.Map<String, Object>> createPost(
	        @RequestBody PostDto post,
			HttpServletRequest request
	) throws IOException, Exception {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		post newPost = postService.createPost(post.getContent(), post.getImageList(), request);
		response.put("msg", "Success");
		response.put("newPost", newPost);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/post/{postId}")
	public ResponseEntity<java.util.Map<String, Object>> deletePost(
			@PathVariable("postId") int postId,
			HttpServletRequest request 
	) throws Exception {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		postService.deletePost(postId, request);
		response.put("msg", "Xoá thành công");
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/post/{postId}")
	public ResponseEntity<java.util.Map<String, Object>> getPost(@PathVariable("postId") int postId) throws Exception{
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		post Post = postRepository.findById(postId).orElseThrow();
		response.put("post", Post);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/posts/explore")
	public ResponseEntity<java.util.Map<String, Object>> getAllPosts(
			HttpServletRequest request
	) throws IOException, Exception {
		List<post> posts = postService.getAllExplorePost(request);
		posts = posts.stream().sorted((p1, p2) -> p2.getCreateAt().compareTo(p1.getCreateAt())).collect(Collectors.toList());
		int result = 0;
		for(Object i:posts)	result++;
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		response.put("msg", "Success");
		response.put("result", result);
		response.put("posts", posts);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/posts/home")
	public ResponseEntity<java.util.Map<String, Object>> getAllFollowersPosts(
			HttpServletRequest request
	) throws IOException, Exception{
		List<post> posts = postService.getAllFollowersPost(request);
		posts = posts.stream().sorted((p1, p2) -> p2.getCreateAt().compareTo(p1.getCreateAt())).collect(Collectors.toList());
		int result = 0;
		for(Object i:posts)	result++;
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		response.put("msg", "Success");
		response.put("result", result);
		response.put("posts", posts);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/userPosts/{userId}")
	public ResponseEntity<java.util.Map<String, Object>> getAllUserPost(@PathVariable("userId") Integer userId) 
	{
		List<post> posts = postRepository.findByUserId(userId);
		posts = posts.stream().sorted((p1, p2) -> p2.getCreateAt().compareTo(p1.getCreateAt())).collect(Collectors.toList());
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		response.put("msg", "Success");
		response.put("posts", posts);
		return ResponseEntity.ok(response);
	}
	
	@RequestMapping(value = "/post/{postId}", method= RequestMethod.PATCH)
	public ResponseEntity<java.util.Map<String, Object>> updatePost(
			@PathVariable("postId") Integer postId, 
			@RequestBody PostDto post,
			HttpServletRequest request
	) throws IOException, Exception {
		System.out.println(post.getIsNewImage());
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		post newPost = postService.updatePost(postId, post.getContent(), post.getImageList(), post.getIsNewImage(), request);
		response.put("msg", "Success");
		response.put("newPost", newPost);
		return ResponseEntity.ok(response);
	}
	
	@RequestMapping(value = "/post/{postId}/like", method= RequestMethod.PATCH)
	public ResponseEntity<java.util.Map<String, Object>> likePost(
			@PathVariable("postId") Integer postId, 
			HttpServletRequest request
	) throws IOException, Exception {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		postService.likePost(postId, request);
		response.put("msg", "Success");
		return ResponseEntity.ok(response);
	}
	
	@RequestMapping(value = "/post/{postId}/unlike", method= RequestMethod.PATCH)
	public ResponseEntity<java.util.Map<String, Object>> unLikePost(
			@PathVariable("postId") Integer postId,
			HttpServletRequest request
	) throws IOException, Exception {
		java.util.Map<String, Object> response = new java.util.HashMap<>();
		postService.unlikePost(postId, request);
		response.put("msg", "Success");
		return ResponseEntity.ok(response);
	}
	
}
