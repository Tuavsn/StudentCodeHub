package com.group7.studentcodehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group7.studentcodehub.entities.post_like;

public interface LikeRepository extends JpaRepository<post_like, Integer>{

}
