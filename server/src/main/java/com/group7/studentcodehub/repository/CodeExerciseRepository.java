package com.group7.studentcodehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.group7.studentcodehub.entities.code_exercise;

public interface CodeExerciseRepository extends JpaRepository<code_exercise, Integer> {

	@Query("SELECT c FROM code_exercise c WHERE c.status = :status")
	List<code_exercise> findByStatus(@Param(value = "status") String status);
}
