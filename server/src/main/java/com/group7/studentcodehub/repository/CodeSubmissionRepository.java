package com.group7.studentcodehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.group7.studentcodehub.entities.code_submission;

public interface CodeSubmissionRepository extends JpaRepository<code_submission, Integer> {
	@Query("SELECT MONTH(c.createAt), COUNT(c.id) FROM code_submission c GROUP BY MONTH(c.createAt)")
	List<Object[]> getTotalCodeSubmissionPerMonth();
}
