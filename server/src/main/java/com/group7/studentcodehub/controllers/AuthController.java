package com.group7.studentcodehub.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
	
	@GetMapping("")
	public ResponseEntity<String> auth() {
		return ResponseEntity.ok("well come to auth api");
	}
	
}
