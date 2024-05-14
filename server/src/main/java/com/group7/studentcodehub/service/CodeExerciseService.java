package com.group7.studentcodehub.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import com.group7.studentcodehub.dto.CodeExerciseDto;
import com.group7.studentcodehub.entities.code_exercise;
import com.group7.studentcodehub.entities.code_submission;
import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.repository.CodeExerciseRepository;
import com.group7.studentcodehub.repository.CodeSubmissionRepository;
import com.group7.studentcodehub.repository.UserRepository;
import com.group7.studentcodehub.util.FetchApiUtil;
import com.group7.studentcodehub.util.MyConstants;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class CodeExerciseService {
	@Autowired
	private CodeExerciseRepository codeExerciseRepository;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CodeSubmissionRepository codeSubmissionRepository;

	ZoneId vietnamZone = ZoneId.of("Asia/Ho_Chi_Minh");

	public List<code_exercise> getApprovedCodeExercise() {
		List<code_exercise> lists = codeExerciseRepository.findByStatus("APPROVED");
		if (lists.size() > 0) {
			return lists;
		}
		return new java.util.ArrayList<>();
	}

	public List<code_exercise> getQueueCodeExercise() {
		List<code_exercise> lists = codeExerciseRepository.findByStatus("NOT_APPROVED");
		if (lists.size() > 0) {
			return lists;
		}
		return new java.util.ArrayList<>();
	}

	public code_exercise getCodeExerciseById(int id) {
		return codeExerciseRepository.findById(id).get();
	}

	public code_submission submitCode(code_exercise codeExercise, String code, user User, int language_id) {
		try {

			JsonObject status;
			double totalScore = codeExercise.getTotalScore();
			int testCasesCount;
			int accepted = 0;
			JsonObject fetchResult;

			Map<String, String> params = new HashMap<>();
			Map<String, String> headers = new HashMap<>();
			Map<String, Object> body = new HashMap<>();

			body.put("source_code", code);
			body.put("language_id", language_id);

			params.put("fields", "*");
			params.put("wait", "true");
			params.put("base64_encoded", "false");

			headers.put("X-RapidAPI-Host", MyConstants.REACT_APP_RAPID_API_HOST);
			headers.put("X-RapidAPI-Key", MyConstants.REACT_APP_RAPID_API_KEY);
			headers.put("Content-Type", "application/json");

			JsonArray testCases = new Gson().fromJson(codeExercise.getTestCases(), JsonArray.class);
			testCasesCount = testCases.size();
			JsonArray results = new JsonArray();
			for (int i = 0; i < testCases.size(); i++) {
				JsonObject testCase = testCases.get(i).getAsJsonObject();

				String input = testCase.get("input").getAsString();
				String output = testCase.get("output").getAsString();

				body.remove("stdin");
				body.put("stdin", input);
				body.remove("expected_output");
				body.put("expected_output", output);

				fetchResult = FetchApiUtil.sendHttpRequestt(MyConstants.REACT_APP_RAPID_API_URL, body, params, headers,
						"POST");
				results.add(fetchResult);
				status = fetchResult.get("status").getAsJsonObject();
				if (status.get("id").getAsInt() == 3) {
					accepted++;
				}
			}

			code_exercise exercise = codeExerciseRepository.findById(codeExercise.getId()).get();

			code_submission codeSubmission = code_submission.builder().code(code).codeExercise(exercise).user(User)
					.language_id(language_id).score(totalScore * (1.0 * accepted / testCasesCount))
					.result(results.toString()).build();
			codeSubmissionRepository.save(codeSubmission);
			return codeSubmission;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public code_exercise createQueueExercise(CodeExerciseDto codeExercise) {
		code_exercise newCodeExercise = code_exercise.builder().title(codeExercise.getTitle())
				.description(codeExercise.getDescription()).example(codeExercise.getExample())
				.tags(codeExercise.getTags()).difficulty(codeExercise.getDifficulty()).status("NOT_APPROVED")
				.otherProps(codeExercise.getOtherProps()).testCases(codeExercise.getTestCases())
				.author(codeExercise.getAuthor()).totalScore(codeExercise.getTotalScore())
				.createAt(LocalDateTime.now(vietnamZone))
				.build();
		return codeExerciseRepository.save(newCodeExercise);
	}

	public code_exercise approveQueueExercise(int id, HttpServletRequest request) throws UsernameNotFoundException {
		final String authHeader = request.getHeader("Authorization");
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))
			return null;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName)
					.orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			if (jwtService.isTokenValid(refreshToken, User) && User.getRole().equals("ADMIN")) {
				code_exercise codeExercise = codeExerciseRepository.findById(id).get();
				codeExercise.setStatus("APPROVED");
				return codeExerciseRepository.save(codeExercise);
			}
		}
		return null;
	}

	public void deleteCodeExercise(int id, HttpServletRequest request) {
		final String authHeader = request.getHeader("Authorization");
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))
			return;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			var User = userRepository.findByUserName(userName)
					.orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			var codeExercise = codeExerciseRepository.findById(id);
			if (jwtService.isTokenValid(refreshToken, User)
					&& (User.getRole().equals("ADMIN") || User.getId() == codeExercise.get().getAuthor().getId())) {
				codeExerciseRepository.deleteById(id);
			}
		}
	}

	public code_exercise updateCodeExercise(int id, CodeExerciseDto codeExercise, HttpServletRequest request) {
		final String authHeader = request.getHeader("Authorization");
		final String refreshToken;
		final String userName;
		if (authHeader == null || !authHeader.startsWith("Bearer"))
			return null;
		refreshToken = authHeader.substring(7);
		userName = jwtService.extractUsername(refreshToken);
		if (userName != null) {
			user User = userRepository.findByUserName(userName)
					.orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));
			var codeExerciseEntity = codeExerciseRepository.findById(id);
			if (jwtService.isTokenValid(refreshToken, User)
					&& User.getId() == codeExerciseEntity.get().getAuthor().getId()) {
				codeExerciseEntity.get().setTitle(codeExercise.getTitle());
				codeExerciseEntity.get().setDescription(codeExercise.getDescription());
				codeExerciseEntity.get().setExample(codeExercise.getExample());
				codeExerciseEntity.get().setTags(codeExercise.getTags());
				codeExerciseEntity.get().setDifficulty(codeExercise.getDifficulty());
				codeExerciseEntity.get().setOtherProps(codeExercise.getOtherProps());
				codeExerciseEntity.get().setTestCases(codeExercise.getTestCases());
				codeExerciseEntity.get().setTotalScore(codeExercise.getTotalScore());
				return codeExerciseRepository.save(codeExerciseEntity.get());
			}
		}
		return null;
	}
}