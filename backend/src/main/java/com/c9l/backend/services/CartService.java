package com.c9l.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.c9l.backend.dto.AddCartItemDTO;
import com.c9l.backend.dto.CartDTO;
import com.c9l.backend.dto.CartItemDTO;
import com.c9l.backend.entities.Cart;
import com.c9l.backend.entities.CartItem;
import com.c9l.backend.entities.Product;
import com.c9l.backend.entities.User;
import com.c9l.backend.repositories.CartItemRepository;
import com.c9l.backend.repositories.CartRepository;
import com.c9l.backend.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public CartDTO addItem(AddCartItemDTO dto) {
        
        User user = userService.getAuthenticatedUser();
        
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
 
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found."));
        
        Optional<CartItem> optionalItem =
                cartItemRepository.findByCartAndProduct(cart, product);

        if (optionalItem.isPresent()) {

            CartItem item = optionalItem.get();

            item.setQuantity(item.getQuantity() + dto.getQuantity());

            cartItemRepository.save(item);

        } else {

            CartItem item = new CartItem();

            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(dto.getQuantity());

            cartItemRepository.save(item);
        }

        
        Cart updatedCart = cartRepository.findByUser(user)
                .orElseThrow();

        return new CartDTO(updatedCart);
    }
    
    public void deleteItem(Long id) {
    	User user = userService.getAuthenticatedUser();
    	
    	CartItem item = cartItemRepository
    			.findByIdAndCartUserId(id, user.getId())
    			.orElseThrow(() -> new RuntimeException("Item not found"));
    	
    	cartItemRepository.delete(item);
    			
    }
    
    public CartDTO listCart() {
    	User user = userService.getAuthenticatedUser();
    	
    	Cart cart = cartRepository.findByUser(user)
    			.orElseThrow(() -> new RuntimeException("Cart not found"));
    	
    	return new CartDTO(cart);
    }
}
