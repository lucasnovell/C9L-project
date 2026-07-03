package com.c9l.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.c9l.backend.dto.UserDTO;
import com.c9l.backend.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public UserDTO register (@RequestBody UserDTO dto) {
		
		return userService.register(dto);
	}
}
