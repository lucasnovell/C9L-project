package com.c9l.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.c9l.backend.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
