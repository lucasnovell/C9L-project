package com.c9l.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.c9l.backend.dto.OrderDTO;
import com.c9l.backend.services.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

	@Autowired
	private OrderService service;
	
	@PostMapping
	public ResponseEntity<OrderDTO> checkout(){
		
		OrderDTO dto = service.checkout();
		
		return ResponseEntity.ok(dto);
		
	}
	
}
