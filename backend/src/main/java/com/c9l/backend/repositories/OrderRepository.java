package com.c9l.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.c9l.backend.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
