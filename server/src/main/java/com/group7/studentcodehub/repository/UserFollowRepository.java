package com.group7.studentcodehub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group7.studentcodehub.entities.user;
import com.group7.studentcodehub.entities.user_follow;

public interface UserFollowRepository extends JpaRepository<user_follow, Integer> {
	List<user_follow> findByTarget(Optional<user> target);
	List<user_follow> findByTarget(user target);
	List<user_follow> findBySource(Optional<user> source);
	List<user_follow> findBySource(user source);
	user_follow findBySourceAndTarget(user source, user target);
}
