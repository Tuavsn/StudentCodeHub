package com.group7.studentcodehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.group7.studentcodehub.entities.user_message;

public interface MessageRepository extends JpaRepository<user_message, Integer>{
	@Query("SELECT um.source, um.target, MAX(um.id), um.content, um.image, um.status, um.createAt " +
	           "FROM user_message um " +
	           "WHERE (um.source.id = :sourceId AND um.target.id = :targetId) OR " +
	                 "(um.source.id = :targetId AND um.target.id = :sourceId) " +
	           "GROUP BY um.source.id, um.target.id, um.content, um.image, um.status, um.createAt " +
	           "ORDER BY createAt")
	List<Object[]> findLatestMessages(@Param("sourceId") int sourceId, @Param("targetId") int targetId);
	@Query("SELECT DISTINCT CASE " +
            "WHEN um.target.id = :sourceId THEN um.source.id " +
            "WHEN um.source.id = :sourceId THEN um.target.id " +
            "END " +
            "FROM user_message um " +
            "WHERE um.target.id = :sourceId OR um.source.id = :sourceId")
	List<Integer> findAllMessages(@Param("sourceId") int sourceId);
}
