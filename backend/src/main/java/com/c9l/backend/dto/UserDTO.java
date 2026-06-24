package com.c9l.backend.dto;

import com.c9l.backend.entities.User;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor  
@AllArgsConstructor 
public class UserDTO {

	private Long id;
	private String name;
	private String email;
	private String password;
	
	
	public UserDTO (User entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
		password = entity.getPassword();
		
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


	public String getPassword() {
		return password;
	}
	
	
	
	
}
