package com.c9l.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping
	public ResponseEntity<Page<OrderDTO>> findAll (Pageable pageable){
		Page<OrderDTO> page = service.findAll(pageable);
		return ResponseEntity.ok(page);
	}
	
}
