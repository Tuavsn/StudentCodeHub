package com.group7.studentcodehub.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
@Table(name = "post_comment")
public class post_comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JsonIgnore
	private post post;
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	private user user;
	@Column(columnDefinition = "TEXT")
	private String content;
	@OneToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private user tag;
	@OneToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private user reply;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime createAt;
}
