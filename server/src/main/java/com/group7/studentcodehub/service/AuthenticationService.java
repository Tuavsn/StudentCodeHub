package com.group7.studentcodehub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.group7.studentcodehub.dto.AuthenticationResponse;
import com.group7.studentcodehub.dto.UserLoginDto;
import com.group7.studentcodehub.dto.UserRegistDto;
import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.entities.token;
import com.group7.studentcodehub.repository.TokenRepository;
import com.group7.studentcodehub.repository.UserRepository;

import com.group7.studentcodehub.entities.user_follow;
import com.group7.studentcodehub.repository.UserFollowRepository;
import com.group7.studentcodehub.service.JwtService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthenticationService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	UserFollowRepository userFollowRepository;
	@Autowired
	private TokenRepository tokenRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;

	public AuthenticationResponse user_regist(UserRegistDto request) {
		if(!userRepository.findByUserName(request.getUserName()).isEmpty())
			return AuthenticationResponse.builder()
					.msg("Tên tài khoản đã tồn tại")
					.build();
		else if(!userRepository.findByEmail(request.getEmail()).isEmpty())
			return AuthenticationResponse.builder()
					.msg("Email đã tồn tại")
					.build();
		
		var User = user.builder()
				.fullName(request.getFullName())
				.userName(request.getUserName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role("USER")
				.avatar("blank-profile-picture-973460__340.webp")
				.build();
		var savedUser = userRepository.save(User);
		var jwtToken = jwtService.generateToken(User);
		var refreshToken = jwtService.generateRefreshToken(User);
		saveUserToken(savedUser, jwtToken);
		List<user_follow> followers = new ArrayList<>();
		List<user_follow> following = new ArrayList<>();
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.refresh_token(refreshToken)
				.msg("Đăng ký thành công")
				.User(User)
				.followers(followers)
				.following(following)
				.build();
	}
	
	public AuthenticationResponse admin_regist(UserRegistDto request) {
		var User = user.builder()
				.fullName(request.getFullName())
				.userName(request.getUserName())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role("ADMIN")
				.avatar("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png")
				.build();
		var savedUser = userRepository.save(User);
		var jwtToken = jwtService.generateToken(User);
		var refreshToken = jwtService.generateRefreshToken(User);
		saveUserToken(savedUser, jwtToken);
		List<user_follow> followers = new ArrayList<>();
		List<user_follow> following = new ArrayList<>();
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.refresh_token(refreshToken)
				.msg("Đăng ký thành công")
				.User(User)
				.followers(followers)
				.following(following)
				.build();
	}

	public AuthenticationResponse login(UserLoginDto request) {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
			var User = userRepository.findByUserName(request.getUserName()).orElseThrow();
			var jwtToken = jwtService.generateToken(User);
			var refreshToken = jwtService.generateRefreshToken(User);
			revokeAllUserTokens(User);
			saveUserToken(User, jwtToken);
			List<user_follow> followers = userFollowRepository.findByTarget(userRepository.findById(User.getId()));
			List<user_follow> following = userFollowRepository.findBySource(userRepository.findById(User.getId()));
			return AuthenticationResponse.builder()
					.accessToken(jwtToken)
					.refresh_token(refreshToken)
					.msg("Đăng nhập thành công")
					.User(User)
					.followers(followers)
					.following(following)
					.build();
		} catch (Exception e) {
			return AuthenticationResponse.builder()
					.msg("Tên tài khoản hoặc mật khẩu không chính xác")
					.build();
		}
	}

	public AuthenticationResponse logout() {
		return AuthenticationResponse.builder().msg("Đăng xuất thành công").build();
	}

	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userName;
		try {
			if (authHeader == null || !authHeader.startsWith("Bearer"))
				return;
			refreshToken = authHeader.substring(7);
			userName = jwtService.extractUsername(refreshToken);
			if (userName != null) {
				var User = userRepository.findByUserName(userName).orElseThrow();
				if (jwtService.isTokenValid(refreshToken, User)) {
					var accessToken = jwtService.generateToken(User);
					revokeAllUserTokens(User);
					saveUserToken(User, accessToken);
					var authResponse = AuthenticationResponse.builder()
							.accessToken(accessToken)
							.refresh_token(refreshToken)
							.User(User)
							.msg("RefreshToken thành công")
							.build();
					new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
				} else {
					throw new Exception();
				}
			}
		} catch (Exception e) {
			var authResponse = AuthenticationResponse.builder()
					.msg("RefreshToken expired")
					.build();
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
		}
	}
	
	public void getUserInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {
		final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		final String accessToken;
		final String userName;
		try {
			if (authHeader == null || !authHeader.startsWith("Bearer"))
				return;
			accessToken = authHeader.substring(7);
			userName = jwtService.extractUsername(accessToken);
			if (userName != null) {
				var User = userRepository.findByUserName(userName).orElseThrow();
				List<user_follow> followers = userFollowRepository.findByTarget(userRepository.findById(User.getId()));
				List<user_follow> following = userFollowRepository.findBySource(userRepository.findById(User.getId()));
				var isTokenValid = tokenRepository.findByToken(accessToken)
						.map(token -> (token.expired == false) && (token.revoked == false)).orElse(false);
				if (jwtService.isTokenValid(accessToken, User) && isTokenValid) {
					var authResponse = AuthenticationResponse.builder()
							.User(User)
							.msg("Lấy thông tin đăng nhập thành công")
							.followers(followers)
							.following(following)
							.build();
					new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
				} else {
					throw new Exception();
				}
			}
		} catch (Exception e) {
			var authResponse = AuthenticationResponse.builder()
					.msg("Invalid token")
					.build();
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
		}
	}

	public void saveUserToken(user User, String jwtToken) {
		var Token = token.builder()
				.user(User)
				.token(jwtToken)
				.expired(false)
				.revoked(false)
				.build();
		tokenRepository.save(Token);
	}

	public void revokeAllUserTokens(user User) {
		var validUserTokens = tokenRepository.findAllValidTokenByUser(User.getId());
		if (validUserTokens.isEmpty())
			return;
		validUserTokens.forEach(token -> {
			token.setExpired(true);
			token.setRevoked(true);
		});
		tokenRepository.saveAll(validUserTokens);
	}

}
