package com.group7.studentcodehub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group7.studentcodehub.entities.user;

public interface UserRepository extends JpaRepository<user, Integer>{
//	@Query("SELECT u FROM user u JOIN FETCH u.userFollow")
//	List<user> findAllUser();
	Optional<user> findByUserName(String username);
	Optional<user> findByEmail(String email);
}
