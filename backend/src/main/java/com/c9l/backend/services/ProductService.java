package com.c9l.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.c9l.backend.dto.ProductDTO;
import com.c9l.backend.entities.Product;
import com.c9l.backend.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;
	
	public List<ProductDTO> findAll(){
		List<Product> result = repository.findAll();
		return result.stream().map(ProductDTO::new).toList();
	}
	
}
