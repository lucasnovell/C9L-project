package com.c9l.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.c9l.backend.dto.UserDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/login")
	public ResponseEntity<UserDTO> login (@RequestBody @Valid UserDTO dto) {
		var usernamePassword = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
		var auth = this.authenticationManager.authenticate(usernamePassword);
		
		return ResponseEntity.ok().build();
	}
	
}
