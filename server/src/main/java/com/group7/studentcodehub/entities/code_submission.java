package com.group7.studentcodehub.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import lombok.ToString;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "code_submission")
@ToString
public class code_submission {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private user user;
	@ManyToOne
	@JsonIgnore
	private code_exercise codeExercise;
	@Column(columnDefinition = "LONGTEXT")
	private String code;
	private int language_id;
	@JsonIgnore
	@Column(columnDefinition = "LONGTEXT")
	private String result;
	private double score;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime createAt;
}
