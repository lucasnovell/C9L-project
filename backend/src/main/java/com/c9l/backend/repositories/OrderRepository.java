package com.c9l.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.c9l.backend.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@EntityGraph(attributePaths = {
			"items",
			"items.product"
			}) 
	Optional<Order> findById(Long id);
}
