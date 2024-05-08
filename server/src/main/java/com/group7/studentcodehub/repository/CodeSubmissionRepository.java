package com.group7.studentcodehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group7.studentcodehub.entities.code_submission;

public interface CodeSubmissionRepository extends JpaRepository<code_submission, Integer> {

}
