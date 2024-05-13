package com.group7.studentcodehub.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.repository.CodeExerciseRepository;
import com.group7.studentcodehub.repository.CodeSubmissionRepository;
import com.group7.studentcodehub.repository.PostRepository;
import com.group7.studentcodehub.repository.UserRepository;

@Service
public class AdminService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	PostRepository postRepository;
	@Autowired
	CodeExerciseRepository codeExerciseRepository;
	@Autowired
	CodeSubmissionRepository codeSubmissionRepository;
	@Autowired	
	AuthenticationService authenticationService;
	
	public Object getDashBoard() {
		Map<Integer, Long> postsPerMonth = new LinkedHashMap<>();
		Map<Integer, Long> codeExercisesPerMonth = new LinkedHashMap<>();
		Map<Integer, Long> codeSubmissionsPerMonth = new LinkedHashMap<>();
		for (int i = 1; i <= 12; i++) {
            postsPerMonth.put(i, 0L);
            codeExercisesPerMonth.put(i, 0L);
            codeSubmissionsPerMonth.put(i, 0L);
        }

        // Truy vấn để đếm số lượng bài post cho mỗi tháng
        List<Object[]> totalPostPerMonthResults = postRepository.getTotalPostPerMonth();
        List<Object[]> totalCodeExercisePerMonthResults = codeExerciseRepository.getTotalCodeExercisePerMonth();
        List<Object[]> totalCodeSubmissionPerMonthResults = codeSubmissionRepository.getTotalCodeSubmissionPerMonth();

        // Hợp nhất kết quả của cả hai danh sách
        for (Object[] result : totalPostPerMonthResults) {
            int month = (int) result[0];
            long count = (long) result[1];
            postsPerMonth.put(month, count);
        }
        
        for (Object[] result : totalCodeExercisePerMonthResults) {
            int month = (int) result[0];
            long count = (long) result[1];
            codeExercisesPerMonth.put(month, count);
        }


        for (Object[] result : totalCodeSubmissionPerMonthResults) {
            int month = (int) result[0];
            long count = (long) result[1];
            codeSubmissionsPerMonth.put(month, count);
        }

        long totalPosts = postRepository.findAll().size();
        
        long totalCodeExercises = codeExerciseRepository.findAll().size();
        
        long totalCodeSubmissions = codeSubmissionRepository.findAll().size();
        
        long totalUsers = userRepository.findAll().size();
        
        Map<String, Object> resultMap = new LinkedHashMap<>();
        
        resultMap.put("totalPosts", totalPosts);
        
        resultMap.put("totalCodeExercises", totalCodeExercises);
        
        resultMap.put("totalCodeSubmissions", totalCodeSubmissions);
        
        resultMap.put("totalUsers", totalUsers);
        
        List<Map<String, Object>> monthlyDataList = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            Map<String, Object> monthlyData = new LinkedHashMap<>();
            monthlyData.put("month", "Tháng " + i);
            monthlyData.put("posts", postsPerMonth.get(i));
            monthlyData.put("codeExercises", codeExercisesPerMonth.get(i));
            monthlyData.put("codeSubmissions", codeSubmissionsPerMonth.get(i));
            monthlyDataList.add(monthlyData);
        }
        resultMap.put("monthlyData", monthlyDataList);

        return resultMap;
	}
	
	public void blockUser(int userId) {
		user existUser = userRepository.getById(userId);
		existUser.setStatus(1);
		userRepository.save(existUser);
		authenticationService.revokeAllUserTokens(existUser);
	}
	
	public void unBlockUser(int userId) {
		user existUser = userRepository.getById(userId);
		existUser.setStatus(0);
		userRepository.save(existUser);
	}
	
//	public void updateUserInfo(int userId, UserProfileDto) {
//		user existUser = userRepository.getById(userId);
//		existUser.setStatus(1);
//		userRepository.save(existUser);
//	}
}
