package com.group7.studentcodehub.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.group7.studentcodehub.entities.post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
	@JsonProperty("post")
	private post Post;
	private int result;
	private int page;
}
