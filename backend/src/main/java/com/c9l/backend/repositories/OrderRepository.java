package com.c9l.backend.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.c9l.backend.entities.Order;
import com.c9l.backend.entities.User;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@EntityGraph(attributePaths = {
			"items",
			"items.product"
			}) 
	Optional<Order> findById(Long id);
	
	@EntityGraph(attributePaths = {
			"items",
			"items.product",
			"user"
			}) 
	Page<Order> findByUser(User user, Pageable pageable);
	
}


