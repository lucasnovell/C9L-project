package com.c9l.backend.entities;

import java.math.BigDecimal;
import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor  
@AllArgsConstructor 
@Setter
@Getter
public class Order {

	private Long id;
	private Instant orderMoment;
	private OrderStatus status;
	private User user;
	private BigDecimal totalValue;
}
