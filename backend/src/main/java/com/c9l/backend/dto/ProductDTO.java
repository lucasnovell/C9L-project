package com.c9l.backend.dto;

import java.math.BigDecimal;

import com.c9l.backend.entities.Product;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor  
@AllArgsConstructor 
public class ProductDTO {

	private Long id;
	private String name;
	private String description;
	private BigDecimal price;
	private String image;
	
	
	public ProductDTO (Product entity) {
		id = entity.getId();
		name = entity.getName();
		description = entity.getDescription();
		price  = entity.getPrice();
		image = entity.getImage();
	}
	
	
	// Getter
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getDescription() {
		return description;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public String getImage() {
		return image;
	}
	

	
	
	
	
	
}
