package com.c9l.backend.dto;

public class AuthenticationDTO {

	private String email;
	private String password;
	
	public AuthenticationDTO() {
		
	}

	public AuthenticationDTO(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}
	
	
	
	
	
}
