package com.group7.studentcodehub.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group7.studentcodehub.dto.AuthenticationResponse;
import com.group7.studentcodehub.dto.UserLoginDto;
import com.group7.studentcodehub.dto.UserRegistDto;
import com.group7.studentcodehub.service.AuthenticationService;

import com.group7.studentcodehub.repository.UserFollowRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin()
public class AuthController {
	
	@Autowired
	AuthenticationService authenticationService;
	@Autowired
	UserFollowRepository userFollowRepository;
	
	@PostMapping("/regist")
	public ResponseEntity<AuthenticationResponse> Regist(@RequestBody UserRegistDto request) {
		AuthenticationResponse response = authenticationService.user_regist(request);
		if(response.getUser() == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		return ResponseEntity.ok(response);	
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> Login(@RequestBody UserLoginDto request) {
		AuthenticationResponse response = authenticationService.login(request);
		if(response.getUser() == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<AuthenticationResponse> Logout() {
		return ResponseEntity.ok(authenticationService.logout());
	}
	
	@PostMapping("/refresh-token")
	public void RefreshToken(
			HttpServletRequest request,
			HttpServletResponse response
	) throws IOException {
		authenticationService.refreshToken(request, response);
	}
	
	@PostMapping("/get-user-info")
	public void getUserInfo(
			HttpServletRequest request,
			HttpServletResponse response
	) throws IOException {
		authenticationService.getUserInfo(request, response);
	}
	
}
