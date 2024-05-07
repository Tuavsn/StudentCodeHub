package com.group7.studentcodehub.dto;

import com.group7.studentcodehub.entities.user;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotifyDto {
	private user target;
	private String content;
	private String link;
}
