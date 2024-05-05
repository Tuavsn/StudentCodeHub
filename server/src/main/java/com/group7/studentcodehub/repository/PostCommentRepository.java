package com.group7.studentcodehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group7.studentcodehub.entities.post;
import com.group7.studentcodehub.entities.post_comment;
import com.group7.studentcodehub.entities.user;

public interface PostCommentRepository extends JpaRepository<post_comment, Integer>{
	boolean existsByPostAndUser(post Post, user User);
}
