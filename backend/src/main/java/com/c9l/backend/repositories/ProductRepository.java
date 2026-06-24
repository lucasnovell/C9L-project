package com.c9l.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.c9l.backend.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
