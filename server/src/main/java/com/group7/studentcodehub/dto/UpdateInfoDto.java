package com.group7.studentcodehub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateInfoDto {
	private String fullName;
	private String email;
	private String password;
	private String avatar;
	private String gender;
	private String mobile;
}
