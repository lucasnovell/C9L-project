package com.c9l.backend.dto;

import java.math.BigDecimal;
import java.time.Instant;

import com.c9l.backend.entities.Order;
import com.c9l.backend.entities.OrderStatus;
import com.c9l.backend.entities.User;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;



@NoArgsConstructor  
@AllArgsConstructor 
public class OrderDTO {
	private Long id;
	private Instant orderMoment;
	private OrderStatus status;
	private User user;
	private BigDecimal totalValue;
	
	
	public OrderDTO(Order entity) {
		id = entity.getId();
		orderMoment = entity.getOrderMoment();
		status = entity.getStatus();
		user = entity.getUser();
		totalValue = entity.getTotalValue();
	}
	
	public Long getId() {
		return id;
	}
	public Instant getOrderMoment() {
		return orderMoment;
	}
	public OrderStatus getStatus() {
		return status;
	}
	public User getUser() {
		return user;
	}
	public BigDecimal getTotalValue() {
		return totalValue;
	}
	
	
	
	
}
