package com.c9l.backend.entities;


import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor  
@AllArgsConstructor 
@Setter
@Getter
public class User {

	private Long id;
	private String name;
	private String email;
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	

	
			
	
}
