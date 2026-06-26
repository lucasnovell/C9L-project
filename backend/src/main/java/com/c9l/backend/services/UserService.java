package com.c9l.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.c9l.backend.dto.UserDTO;
import com.c9l.backend.entities.Role;
import com.c9l.backend.entities.User;
import com.c9l.backend.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository repository;
	
	public UserDTO register (UserDTO dto) {
		User user = new User();
		
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());
		user.setRole(Role.CLIENT);
		
		repository.save(user);
		
		return new UserDTO(user);
	}
}
