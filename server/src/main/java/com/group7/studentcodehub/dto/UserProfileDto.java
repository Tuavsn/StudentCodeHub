package com.group7.studentcodehub.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.group7.studentcodehub.entities.user_follow;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDto {
	@JsonProperty("id")
	private int id;
	@JsonProperty("fullName")
	private String fullName;
	@JsonProperty("email")
	private String email;
	@JsonProperty("avatar")
	private String avatar;
	@JsonProperty("gender")
	private String gender;
	@JsonProperty("mobile")
	private String mobile;
	@JsonProperty("address")
	private String address;
	@JsonProperty("status")
	private int status; // status = 0: oke, status = 1: reported, status = 2: hide
	@JsonProperty("role")
	private String role;
	@JsonProperty("followers")
	private List<user_follow> followers;
	@JsonProperty("following")
	private List<user_follow> following;
}
