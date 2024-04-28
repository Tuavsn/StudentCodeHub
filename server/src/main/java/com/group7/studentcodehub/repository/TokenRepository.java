package com.group7.studentcodehub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.group7.studentcodehub.entities.token;

public interface TokenRepository extends JpaRepository<token, Integer>{
	@Query(value="""
			select t from token t inner join user u\s
			on t.user.id = u.id\s
			where u.id = :id and (t.expired = false or t.revoked = false)\s
			""")
	List<token> findAllValidTokenByUser(Integer id);
	Optional<token> findByToken(String token);
}
