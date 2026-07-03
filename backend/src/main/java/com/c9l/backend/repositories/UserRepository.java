package com.c9l.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.c9l.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long>  {

	UserDetails findByEmail(String email);
	
}
