package com.group7.studentcodehub.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserMessageDto {
	private int id;
	private MessageRecipientDto source;
	private MessageRecipientDto target;
	private String content;
	private String image;
	private int status;
	private LocalDateTime createAt;
}

