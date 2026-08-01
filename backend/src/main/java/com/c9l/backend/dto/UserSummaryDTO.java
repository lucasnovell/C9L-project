package com.c9l.backend.dto;

import com.c9l.backend.entities.User;

public class UserSummaryDTO {

	private Long id;
	private String name;
	private String email;
	
	public UserSummaryDTO(User entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
				
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}
	
	
	
	
}
