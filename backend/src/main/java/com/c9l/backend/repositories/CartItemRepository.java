package com.c9l.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.c9l.backend.entities.Cart;
import com.c9l.backend.entities.CartItem;
import com.c9l.backend.entities.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
	
	Optional<CartItem> findByIdAndCartUserId(Long id, Long userId);
}
