package com.group7.studentcodehub.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
@Table(name = "notify")
public class notify {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@OnDelete(action = OnDeleteAction.CASCADE)
	@ManyToOne
	private user source;
	@OnDelete(action = OnDeleteAction.CASCADE)
	@ManyToOne
	private user target;
	private String content;
	private String link;
	private int status;
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime createAt;
}
