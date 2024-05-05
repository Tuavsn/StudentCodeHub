package com.group7.studentcodehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.group7.studentcodehub.entities.post;
import com.group7.studentcodehub.entities.post_like;
import com.group7.studentcodehub.entities.user;

public interface PostLikeRepository extends JpaRepository<post_like, Integer>{
	boolean existsByPostAndUser(post Post, user User);
	Optional<post_like> findByPostAndUser(post Post, user User);
}
