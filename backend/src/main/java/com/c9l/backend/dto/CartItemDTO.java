package com.c9l.backend.dto;

import com.c9l.backend.entities.Cart;
import com.c9l.backend.entities.CartItem;
import com.c9l.backend.entities.Product;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor  
@AllArgsConstructor
public class CartItemDTO {
	
	private Long id;
	private Cart cart;
	private Product product;
	private Integer quantity;
	
	public CartItemDTO(CartItem entity) {
		id = entity.getId();
		cart = entity.getCart();
		product = entity.getProduct();
		quantity = entity.getQuantity();
	}
	
	
	
	public Long getId() {
		return id;
	}
	public Cart getCart() {
		return cart;
	}
	public Product getProduct() {
		return product;
	}
	public Integer getQuantity() {
		return quantity;
	}
	
	

}
