package com.c9l.backend.dto;

import com.c9l.backend.entities.Role;
import com.c9l.backend.entities.User;


public class UserDTO {

	private Long id;
	private String name;
	private String email;
	private Role role;
	private String password;
	
	
	public UserDTO (User entity) {
		id = entity.getId();
		name = entity.getName();
		email = entity.getEmail();
		role = entity.getRole();
		password = entity.getPassword();
		
	}
	
	
	public UserDTO() {
		
	}

	public UserDTO(Long id, String name, String email, Role role, String password) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.role = role;
		this.password = password;
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


	public Role getRole() {
		return role;
	}
	
	
	
	
	
}
