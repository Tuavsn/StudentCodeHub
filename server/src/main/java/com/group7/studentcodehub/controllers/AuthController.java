package com.group7.studentcodehub.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
import com.group7.studentcodehub.entities.user;
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

	private int OTP_LENGTH = 6;
	private int expirationTime = 60000;
	private String EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND";

	@Data
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	private static class VerifyOtpRequest {
		public String email;
		public String otp;
		public String otp_type;
		public String token;
		public String password;
	}

	@PostMapping("/reset-password")
	public ResponseEntity<Map<String, String>> resetPassword(@RequestBody VerifyOtpRequest body) {
		String otp = body.getOtp();
		String email = body.getEmail();
		String password = body.getPassword();
		String token = body.getToken();
		String otp_type = body.getOtp_type();

		Map<String, String> response = new HashMap<String, String>();

		JsonObject checkOTP = authenticationService.verifyOTP(email, otp, otp_type, token);
		if (!checkOTP.get("msg").getAsString().equals("success")) {
			response.put("msg", checkOTP.get("msg").getAsString());
			return ResponseEntity.ok(response);
		}

		user U = authenticationService.reset_password(email, password);

		if (U == null) {
			response.put("msg", EMAIL_NOT_FOUND);
			return ResponseEntity.ok(response);
		}

		response.put("msg", "success");

		return ResponseEntity.ok(response);
	}

	@Data
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	private static class CreateOtpRequest {
		public String email;
		public String otp_type;
	}

	@Data
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	private static class CreateOtpResponse {
		public String token;
	}

	@PostMapping("/create-otp")
	public ResponseEntity<CreateOtpResponse> CreateOTP(@RequestBody CreateOtpRequest body) {
		String otp = authenticationService.createOTP(OTP_LENGTH);
		String email = body.email;
		String otp_type = body.otp_type;

		user U = null;
		if (email != null) {
			U = authenticationService.getUserByEmail(email);
		}

		if (U == null && !otp_type.equals(authenticationService.REGIST_TYPE)) {
			CreateOtpResponse response = CreateOtpResponse.builder().token(null).build();
			return ResponseEntity.ok(response);
		}

		authenticationService.sendOTP(email, otp, otp_type);
		String token = authenticationService.createToken(email, otp, otp_type, expirationTime);

		CreateOtpResponse response = CreateOtpResponse.builder().token(token).build();
		return ResponseEntity.ok(response);
	}

	@PostMapping("/verify-otp")
	public ResponseEntity<Map<String, String>> verifyOTP(@RequestBody VerifyOtpRequest body) {
		String email = body.getEmail();
		String otp = body.getOtp();
		String otp_type = body.getOtp_type();
		String token = body.getToken();

		JsonObject result = authenticationService.verifyOTP(email, otp, otp_type, token);

		Map<String, String> res = new HashMap<String, String>();

		res.put("msg", result.get("msg").getAsString());

		return ResponseEntity.ok(res);
	}

	@PostMapping("/check-email")
	public ResponseEntity<Map<String, String>> checkEmail(@RequestBody Map<String, String> body) {
		String email = body.get("email");

		System.out.println("check email: " + email);
		user U = authenticationService.getUserByEmail(email);
		Map<String, String> res = new HashMap<String, String>();
		if (U != null) {
			res.put("status", "exist");
		} else {
			res.put("status", "valid");
		}
		return ResponseEntity.ok(res);
	}

	@PostMapping("/check-username")
	public ResponseEntity<Map<String, String>> checkUsername(@RequestBody Map<String, String> body) {
		String username = body.get("username");

		System.out.println("Check username: " + username);
		user U = authenticationService.getUserByUsername(username);
		Map<String, String> res = new HashMap<String, String>();
		if (U != null) {
			res.put("status", "exist");
		} else {
			res.put("status", "valid");
		}
		return ResponseEntity.ok(res);
	}
	
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
