package com.group7.studentcodehub.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.group7.studentcodehub.entities.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	@JsonProperty("access_token")
	private String accessToken;
	@JsonProperty("refresh_token")
	private String refresh_token;
	@JsonProperty("msg")
	private String msg;
	@JsonProperty("user")
	private user User;
}
