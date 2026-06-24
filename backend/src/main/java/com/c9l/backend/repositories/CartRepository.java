package com.c9l.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.c9l.backend.entities.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
