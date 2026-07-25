package com.c9l.backend.dto;

import java.math.BigDecimal;
import java.util.List;

import com.c9l.backend.entities.Cart;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class CartDTO {


		private Long id;

	    private List<CartItemDTO> items;

	    private BigDecimal total;
	    
	    public CartDTO(Cart entity) {

	        this.id = entity.getId();

	        this.items = entity.getItems()
	                .stream()
	                .map(CartItemDTO::new)
	                .toList();

	        this.total = entity.getItems()
	                .stream()
	                .map(item -> item.getProduct()
	                        .getPrice()
	                        .multiply(BigDecimal.valueOf(item.getQuantity())))
	                .reduce(BigDecimal.ZERO, BigDecimal::add);
	    }

	}
	
	
	
	
	

