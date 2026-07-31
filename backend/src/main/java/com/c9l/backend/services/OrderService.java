package com.c9l.backend.services;

import java.math.BigDecimal;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.c9l.backend.dto.OrderDTO;
import com.c9l.backend.entities.Cart;
import com.c9l.backend.entities.CartItem;
import com.c9l.backend.entities.Order;
import com.c9l.backend.entities.OrderItem;
import com.c9l.backend.entities.OrderStatus;
import com.c9l.backend.entities.User;
import com.c9l.backend.repositories.CartItemRepository;
import com.c9l.backend.repositories.CartRepository;
import com.c9l.backend.repositories.OrderItemRepository;
import com.c9l.backend.repositories.OrderRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {

	@Autowired
	private UserService userService;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	
	@Transactional
	public OrderDTO checkout() {
		User user = userService.getAuthenticatedUser();
		
		Cart cart = cartRepository.findByUser(user)
				.orElseThrow(() -> new RuntimeException("Cart not found"));
		
		if(cart.getItems().isEmpty()) {
			throw new RuntimeException("The cart is empty");
		}
		
		Order order = new Order();
		order.setUser(user);
		order.setOrderMoment(Instant.now());
		order.setStatus(OrderStatus.PENDING);
		
		order = orderRepository.save(order);				
	
		BigDecimal total = BigDecimal.ZERO;
		
		for (CartItem cartItem : cart.getItems()) {
			OrderItem orderItem = new OrderItem();
			
			orderItem.setOrder(order);
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuantity());
			
			orderItem.setUnitPrice(cartItem.getProduct().getPrice());
			
			orderItemRepository.save(orderItem);
			
			total = total.add(orderItem.getUnitPrice()
					.multiply(BigDecimal.valueOf(orderItem.getQuantity())));										
		}
		order.setTotalValue(total);
		
		order = orderRepository.save(order);
		
		cartItemRepository.deleteAll(cart.getItems());
		
		return new OrderDTO(order);
	
	}
}
