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
@Table(name = "user_message")
public class user_message {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private user source;
	@ManyToOne
	private user target;
	@Column(columnDefinition = "TEXT")
	private String content;
	private String image;
	private int status; /* 0 is last msg and is not read, 1 is read */
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime createAt;
}
