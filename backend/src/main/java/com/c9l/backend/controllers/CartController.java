package com.c9l.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.c9l.backend.dto.AddCartItemDTO;
import com.c9l.backend.dto.CartDTO;
import com.c9l.backend.services.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService service;

    @PostMapping("/items")
    public ResponseEntity<CartDTO> addItem(
            @RequestBody @Valid AddCartItemDTO dto) {

        CartDTO cart = service.addItem(dto);

        return ResponseEntity.ok(cart);
    }

}
