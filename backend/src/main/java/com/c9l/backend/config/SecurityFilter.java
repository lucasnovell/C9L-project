package com.c9l.backend.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.c9l.backend.repositories.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter{

	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
	                                HttpServletResponse response,
	                                FilterChain filterChain)
	        throws ServletException, IOException {

	    String token = recoverToken(request);

	    if (token != null && !token.isBlank()) {

	        String email = tokenService.validateToken(token);

	        if (email != null) {

	            UserDetails user = userRepository.findByEmail(email);

	            if (user != null) {

	                UsernamePasswordAuthenticationToken authentication =
	                        new UsernamePasswordAuthenticationToken(
	                                user,
	                                null,
	                                user.getAuthorities());

	                SecurityContextHolder.getContext()
	                        .setAuthentication(authentication);
	            }
	        }
	    }

	    filterChain.doFilter(request, response);
	}
	
	private String recoverToken(HttpServletRequest request) {

	    String authHeader = request.getHeader("Authorization");

	    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	        return null;
	    }

	    return authHeader.substring(7);
	}
	
	

}
