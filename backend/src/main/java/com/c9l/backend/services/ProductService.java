package com.c9l.backend.services;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.c9l.backend.dto.ProductDTO;
import com.c9l.backend.entities.Product;
import com.c9l.backend.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;
	
	public Page<ProductDTO> findAll(Pageable pageable) {

	    Page<Product> page = repository.findAll(pageable);

	    return page.map(ProductDTO::new);
	}
	
}
