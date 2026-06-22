package com.c9l.backend.entities;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor  
@AllArgsConstructor 
@Setter
@Getter
public class OrderItem {

	private Long id;
	private Order order;
	private Product product;
	private Integer quantity;
	private BigDecimal unitPrice;
	
	
}
