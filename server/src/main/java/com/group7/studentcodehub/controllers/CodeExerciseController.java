package com.group7.studentcodehub.controllers;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RestController;

import com.group7.studentcodehub.dto.CodeExerciseDto;
import com.group7.studentcodehub.dto.CodeSubmissonDto;
import com.group7.studentcodehub.entities.code_exercise;
import com.group7.studentcodehub.entities.code_submission;
import com.group7.studentcodehub.service.CodeExerciseService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
@CrossOrigin
public class CodeExerciseController {

	@Autowired
	private CodeExerciseService codeExerciseService;

	@DeleteMapping("/code-exercise/{id}")
	public ResponseEntity<Map<String, Object>> deleteCodeExercise(@PathVariable("id") int id,
			HttpServletRequest request) {
		codeExerciseService.deleteCodeExercise(id, request);
		Map<String, Object> response = new java.util.HashMap<>();
		response.put("msg", "Xoá thành công");
		return ResponseEntity.ok(response);
	}

	@GetMapping("/queue-code-exercise/{id}/approve")
	public ResponseEntity<Map<String, Object>> approveQueueExercise(@PathVariable("id") int id,
			HttpServletRequest request) {
		code_exercise approvedExercise;
		try {
			approvedExercise = codeExerciseService.approveQueueExercise(id, request);
		} catch (Exception e) {
			Map<String, Object> response = new java.util.HashMap<>();
			response.put("msg", e.getMessage());
			return ResponseEntity.ok(response);
		}
		Map<String, Object> response = new java.util.HashMap<>();
		response.put("approvedExercise", approvedExercise);
		response.put("msg", "Duyệt thành công");
		return ResponseEntity.ok(response);
	}

	@PostMapping("/code-exercises")
	public ResponseEntity<Map<String, Object>> createQueueExercise(@RequestBody CodeExerciseDto codeExercise,
			HttpServletRequest request) {
		code_exercise newQueueExercise = codeExerciseService.createQueueExercise(codeExercise);

		Map<String, Object> response = new java.util.HashMap<>();
		response.put("queueExercise", newQueueExercise);
		response.put("msg", "Success");
		return ResponseEntity.ok(response);
	}

	@GetMapping("/code-exercises")
	public ResponseEntity<Map<String, Object>> getAllCodeExercise() {
		List<code_exercise> codeExercises = codeExerciseService.getApprovedCodeExercise();
		Map<String, Object> response = new java.util.HashMap<>();
		response.put("codeExercises", codeExercises);
		response.put("totalItems", codeExercises.size());
		response.put("msg", "Success");
		return ResponseEntity.ok(response);
	}

	@GetMapping("/queue-code-exercises")
	public ResponseEntity<Map<String, Object>> getQueueCodeExercise() {
		List<code_exercise> queueExercises = codeExerciseService.getQueueCodeExercise();
		Map<String, Object> response = new java.util.HashMap<>();
		response.put("queueExercises", queueExercises);
		response.put("totalItems", queueExercises.size());
		response.put("msg", "Success");
		return ResponseEntity.ok(response);
	}

	@PostMapping("/code-exercises/compile")
	public ResponseEntity<Map<String, Object>> submitCode(@RequestBody CodeSubmissonDto body,
			HttpServletRequest request) {

		Map<String, Object> response = new java.util.HashMap<>();

		body.setExercise(codeExerciseService.getCodeExerciseById(body.getExercise().getId()));

		code_submission codeSubmission = codeExerciseService.submitCode(body.getExercise(), body.getCode(),
				body.getUser(), body.getLanguage_id());
		response.put("codeSubmission", codeSubmission);

		response.put("msg", "Success");
		return ResponseEntity.ok(response);
	}
}
