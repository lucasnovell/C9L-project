package com.c9l.backend.dto;

import java.math.BigDecimal;

import com.c9l.backend.entities.Order;
import com.c9l.backend.entities.OrderItem;
import com.c9l.backend.entities.Product;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor  
@AllArgsConstructor 
public class OrderItemDTO {

	private Long id;
	private Order order;
	private Product product;
	private Integer quantity;
	private BigDecimal unitPrice;
	
	
	public OrderItemDTO (OrderItem entity) {
		id = entity.getId();
		order = entity.getOrder();
		product = entity.getProduct();
		quantity = entity.getQuantity();
		unitPrice = entity.getUnitPrice();
				
	}
	
	public Long getId() {
		return id;
	}
	public Order getOrder() {
		return order;
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
