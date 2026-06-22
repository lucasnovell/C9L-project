package com.c9l.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor  
@AllArgsConstructor 
@Setter
@Getter
public class CartItem {

	private Long id;
	private Cart cart;
	private Product product;
	private Integer quantity;
	
}
