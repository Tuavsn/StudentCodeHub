package com.group7.studentcodehub.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_friend")
public class user_friend {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private user source;
	@ManyToOne
	private user target;
	private int status;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime createAt;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime updateAt;
}
