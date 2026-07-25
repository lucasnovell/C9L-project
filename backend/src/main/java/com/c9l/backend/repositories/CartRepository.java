package com.c9l.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.c9l.backend.entities.Cart;
import com.c9l.backend.entities.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
	Optional<Cart> findByUser(User user);
}
