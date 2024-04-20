package com.group7.studentcodehub.entities;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
public class post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	private user user;
	private String content;
	@OneToMany(mappedBy = "post")
	private List<post_image> postImage;
	@OneToMany(mappedBy = "post")
	private List<post_comment> postComment;
	@OneToMany(mappedBy = "post")
	private List<post_like> postLike;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime createAt;
}
