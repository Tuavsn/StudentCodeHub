package com.group7.studentcodehub.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
	private List<String> imageList;
	private String Content;
	private Boolean isNewImage;
}
