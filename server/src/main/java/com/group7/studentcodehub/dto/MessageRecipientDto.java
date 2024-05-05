package com.group7.studentcodehub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageRecipientDto {
	private int id;
	private String fullName;
	private String avatar;
	private String role;
	private int status;
}
