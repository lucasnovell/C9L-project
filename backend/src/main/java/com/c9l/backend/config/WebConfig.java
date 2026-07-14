package com.c9l.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class WebConfig {

	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
        .allowedOrigins("http://127.0.0.1:5500", "http://localhost:5500", "http://127.0.0.1:5501", "http://localhost:5501", "http://localhost:5501" ) 
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowedHeaders("*")
        .exposedHeaders("*")
        .allowCredentials(true);
	}
	
}
