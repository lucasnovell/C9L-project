package com.c9l.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.c9l.backend.dto.AddCartItemDTO;
import com.c9l.backend.dto.CartDTO;
import com.c9l.backend.dto.UpdateCartItemDTO;
import com.c9l.backend.services.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService service;

    @PostMapping("/items")
    public ResponseEntity<CartDTO> addItem(@RequestBody @Valid AddCartItemDTO dto) {

        CartDTO cart = service.addItem(dto);

        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
    	service.deleteItem(id);
    	
    	return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartDTO> updateItemQuantity(
            @PathVariable Long id,
            @RequestBody @Valid UpdateCartItemDTO dto) {
        return ResponseEntity.ok(service.updateItemQuantity(id, dto));
    }
    
    @GetMapping
    public ResponseEntity<CartDTO> listCart() {
    	return ResponseEntity.ok(service.listCart());
    }
}
