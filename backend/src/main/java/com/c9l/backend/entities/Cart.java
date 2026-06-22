package com.c9l.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor  
@AllArgsConstructor 
@Setter
@Getter
public class Cart {

	private Long id;
	private User user;
}
