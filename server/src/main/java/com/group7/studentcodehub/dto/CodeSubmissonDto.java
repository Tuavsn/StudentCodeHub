package com.group7.studentcodehub.dto;

import com.group7.studentcodehub.entities.code_exercise;
import com.group7.studentcodehub.entities.user;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@lombok.AllArgsConstructor
public class CodeSubmissonDto {
	private String code;
	private code_exercise exercise;
	private user User;
	private int language_id;
}
