package com.group7.studentcodehub.entities;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class token {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int id;
	public String token;
	public String tokenType = "BEARER";
	public Boolean revoked;
	public Boolean expired;
	@OnDelete(action = OnDeleteAction.CASCADE)
	@ManyToOne
	private user user;
}
