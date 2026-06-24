package com.c9l.backend.dto;

import com.c9l.backend.entities.Cart;
import com.c9l.backend.entities.User;

public class CartDTO {

	private Long id;
	private User user;
	
	
	public CartDTO(Cart entity) {
		id = entity.getId();
		user = entity.getUser();
				
	}
	
	public Long getId() {
		return id;
	}
	public User getUser() {
		return user;
	}
	
	
	
	
	
}
