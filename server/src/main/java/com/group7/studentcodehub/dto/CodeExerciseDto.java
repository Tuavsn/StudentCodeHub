package com.group7.studentcodehub.dto;

import com.group7.studentcodehub.entities.user;

@lombok.Data
@lombok.Builder
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
@lombok.ToString
public class CodeExerciseDto {
	private String title;
	private String description;
	private String tags;
	private String example;
	private String difficulty;
	private String testCases;
	private double totalScore;
	private String otherProps;
	private user author;
}
