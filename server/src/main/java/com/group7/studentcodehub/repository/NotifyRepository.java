package com.group7.studentcodehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group7.studentcodehub.entities.notify;
import com.group7.studentcodehub.entities.user;

public interface NotifyRepository extends JpaRepository<notify, Integer>{
	List<notify> findAllByTarget(user Target);
	void deleteAllByTarget(user Target);
}
