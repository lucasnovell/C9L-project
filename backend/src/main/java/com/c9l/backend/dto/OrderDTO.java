package com.c9l.backend.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import com.c9l.backend.entities.Order;
import com.c9l.backend.entities.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;



@NoArgsConstructor  
@AllArgsConstructor 
public class OrderDTO {
	private Long id;
	private Instant orderMoment;
	private OrderStatus status;
	private UserSummaryDTO user;
	private BigDecimal totalValue;
	private List<OrderItemDTO> items;
	
	public OrderDTO(Order entity) {
		id = entity.getId();
		orderMoment = entity.getOrderMoment();
		status = entity.getStatus();
		user = new UserSummaryDTO(entity.getUser());
		totalValue = entity.getTotalValue();
		items = entity.getItems().stream()
				.map(OrderItemDTO::new)
				.toList();
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

	public BigDecimal getTotalValue() {
		return totalValue;
	}

	public List<OrderItemDTO> getItems() {
		return items;
	}

	public UserSummaryDTO getUser() {
		return user;
	}
	
	
	
	
	
	
}
