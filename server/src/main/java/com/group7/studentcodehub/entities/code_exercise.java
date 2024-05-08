package com.group7.studentcodehub.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "code_exercise")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class code_exercise {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private String description;
	private String example;
	private String tags;
	private String difficulty;
	private String status;
	private String otherProps;
	@JsonIgnore
	private String testCases;
	@ManyToOne
	private user author;
	private double totalScore;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime createAt;
	@OneToMany(mappedBy = "codeExercise")
	private List<code_submission> codeSubmissions;
}
