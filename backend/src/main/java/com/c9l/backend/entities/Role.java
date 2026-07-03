package com.c9l.backend.entities;

public enum Role {

	ADMIN("admin"),
	CLIENT("client");

	private String role;
	
	Role(String role){
		this.role = role;
	}
	
	public String getRole() {
		return role;
	}
}
