package com.group7.studentcodehub.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import javax.management.AttributeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.group7.studentcodehub.entities.post;
import com.group7.studentcodehub.entities.post_comment;
import com.group7.studentcodehub.entities.post_image;
import com.group7.studentcodehub.entities.post_like;
import com.group7.studentcodehub.repository.PostCommentRepository;
import com.group7.studentcodehub.repository.PostImageRepository;
import com.group7.studentcodehub.repository.PostLikeRepository;
import com.group7.studentcodehub.repository.PostRepository;
import com.group7.studentcodehub.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

@Service
public class PostService {
	@Autowired
	private PostLikeRepository postLikeRepository;
	@Autowired
	private PostCommentRepository postCommentRepository;
	@Autowired
	private PostImageRepository postImageRepository;
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtService jwtService;
	ZoneId vietnamZone = ZoneId.of("Asia/Ho_Chi_Minh");
	
	public List<post> getAllExplorePost(
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
				List<post> allPosts = postRepository.findAllExplore(User.getId());
				return allPosts;
			}
		}	
		return null;
	}
	
	public List<post> getAllFollowersPost(
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
				List<post> allPosts = postRepository.findAllByFollower(User.getId());
				return allPosts;
			}
		}	
		return null;
	}
	
	@Transactional
	public post createPost(
			String postHeader,
			Object postContent,
			List<String> postImages,
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
				List<post_like> postLike = new ArrayList<>();
				List<post_comment> postComment = new ArrayList<>();
				List<post_image> postImage = new ArrayList<>();
				var newPost = post.builder()
					.header(postHeader)
					.content(postContent.toString())
					.user(User)
					.postLike(postLike)
					.postComment(postComment)
					.createAt(LocalDateTime.now(vietnamZone))
					.build();
				postRepository.save(newPost);
				for(String i : postImages) {
					var newImg = post_image.builder().post(newPost).imageUrl(i).build();
					postImage.add(newImg);
					postImageRepository.save(newImg);
				}
				newPost.setPostImage(postImage);
				return newPost;
			}
		}	
		return null;
	}
	
	@Transactional
	public post updatePost(
			int postId,
			String postHeader,
			Object postContent,
			List<String> postImages,
			Boolean isNewImage,
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
				post existPost = postRepository.findById(postId).orElseThrow(() -> new AttributeNotFoundException("Không tìm thấy bài post"));
				existPost.setHeader(postHeader);
				existPost.setContent(postContent.toString());
				postRepository.save(existPost);
				if(isNewImage) {
					List<post_image> oldPostImage = existPost.getPostImage();
					for(post_image oldImage : oldPostImage) {
						postImageRepository.delete(oldImage);
					}
					List<post_image> postImage = new ArrayList<>();
					for(String i : postImages) {
						var newImg = post_image.builder().post(existPost).imageUrl(i).build();
						postImage.add(newImg);
						postImageRepository.save(newImg);
					}
					existPost.setPostImage(postImage);
				}
				return existPost;
			}
		}	
		return null;
	}
	
	@Transactional
	public void deletePost(
			int postId, 
			HttpServletRequest request
	) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				postRepository.deleteById(postId);
			}
		}	
	}
	
	@Transactional
	public void likePost(
			int postId, 
			HttpServletRequest request
	) throws IOException, Exception {
		post Post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy post"));
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				if(postLikeRepository.existsByPostAndUser(Post, User)) throw new IllegalStateException("Bạn đã thích bài viết này");
				var PostLike = post_like.builder()
					.post(Post)
					.user(User)
					.build();
				postLikeRepository.save(PostLike);
			}
		}	
	}
	
	@Transactional
	public void unlikePost(
			int postId, 
			HttpServletRequest request
		) throws IOException, Exception {
		post Post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy post"));	
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				if(postLikeRepository.existsByPostAndUser(Post, User) == false) throw new IllegalStateException("Bạn đã thích bài viết này");
				post_like PostLike = postLikeRepository.findByPostAndUser(Post, User).orElseThrow(() -> new NoSuchElementException("Không tìm thấy lượt thích cho bài viết và người dùng đã chỉ định"));
				postLikeRepository.delete(PostLike);
			}
		}		
	}
	
	@Transactional
	public post_comment createComment(
			int postId, 
			String content,
			HttpServletRequest request
	) throws IOException, Exception {
		post Post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy post"));
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))	return null;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				var PostComment = post_comment.builder()
					.post(Post)
					.user(User)
					.content(content)
					.createAt(LocalDateTime.now(vietnamZone))
					.build();
				postCommentRepository.save(PostComment);
				return PostComment;
			}
		}	
		return null;
	}
	
	@Transactional
	public void deleteComment(
			int commentId,
			HttpServletRequest request
	) throws IOException, Exception {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"));
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName).orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User)) {
				postCommentRepository.deleteById(commentId);
			}
		}	
	}
}
