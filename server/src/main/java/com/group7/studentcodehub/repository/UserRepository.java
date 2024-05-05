package com.group7.studentcodehub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.group7.studentcodehub.entities.user;

public interface UserRepository extends JpaRepository<user, Integer>{
	Optional<user> findByUserName(String username);
	Optional<user> findByEmail(String email);
	@Query("SELECT u FROM user u WHERE u.fullName LIKE CONCAT('%', :fullName, '%')")
	List<user> findUserByFullNameLike(String fullName);
}
