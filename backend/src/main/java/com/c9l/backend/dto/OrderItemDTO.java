package com.c9l.backend.dto;

import java.math.BigDecimal;

import com.c9l.backend.entities.OrderItem;
import com.c9l.backend.entities.Product;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor  
@AllArgsConstructor 
public class OrderItemDTO {

	private Long id;
	private Product product;
	private Integer quantity;
	private BigDecimal unitPrice;
	
	
	public OrderItemDTO (OrderItem entity) {
		id = entity.getId();
		product = entity.getProduct();
		quantity = entity.getQuantity();
		unitPrice = entity.getUnitPrice()
				.multiply(BigDecimal.valueOf(entity.getQuantity()));
				
	}
	
	public Long getId() {
		return id;
	}
	public Product getProduct() {
		return product;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public BigDecimal getUnitPrice() {
		return unitPrice;
	}
	
	
	
}
