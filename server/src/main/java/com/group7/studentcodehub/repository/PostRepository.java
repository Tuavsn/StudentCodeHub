package com.group7.studentcodehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.group7.studentcodehub.entities.post;

public interface PostRepository extends JpaRepository<post, Integer>{
	List<post> findByUserId(int userId);
	@Query("SELECT p FROM post p " +
	           "WHERE p.user.id NOT IN " +
	           "(SELECT uf.target.id FROM user_follow uf WHERE uf.source.id = :userId) "
	           + "AND p.user.id <> :userId")
	List<post> findAllExplore(int userId);
	@Query("SELECT p FROM post p " +
	           "INNER JOIN p.user u " +
	           "INNER JOIN user_follow uf ON uf.target.id = u.id " +
	           "WHERE uf.source.id = :userId "
			   + "OR p.user.id = :userId")
	List<post> findAllByFollower(int userId);
}
