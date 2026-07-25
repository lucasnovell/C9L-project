package com.c9l.backend.dto;

import java.math.BigDecimal;

import com.c9l.backend.entities.CartItem;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor  
@AllArgsConstructor
@Getter
public class CartItemDTO {
	
	private Long id;
    private Long productId;
    private String productName;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal subtotal;

    public CartItemDTO(CartItem entity) {

        this.id = entity.getId();
        this.productId = entity.getProduct().getId();
        this.productName = entity.getProduct().getName();
        this.unitPrice = entity.getProduct().getPrice();
        this.quantity = entity.getQuantity();

        this.subtotal =
                entity.getProduct()
                      .getPrice()
                      .multiply(BigDecimal.valueOf(entity.getQuantity()));
    }
	
	

}
