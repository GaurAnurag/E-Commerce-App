package com.ecommerce.app.controller;

import com.ecommerce.app.dto.LoginRequest;
import com.ecommerce.app.dto.LoginResponse;
import com.ecommerce.app.model.User;
import com.ecommerce.app.repository.UserRepository;
import com.ecommerce.app.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import lombok.var;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final AuthenticationManager authManager;
	private final JwtTokenProvider jwtProvider;
	private final UserRepository userRepo;

	public AuthController(AuthenticationManager authManager, JwtTokenProvider jwtProvider, UserRepository userRepo) {
		this.authManager = authManager;
		this.jwtProvider = jwtProvider;
		this.userRepo = userRepo;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
	    try {
	        // Load user to verify exists
	        User u = userRepo.findByEmail(request.getEmail())
	                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

	        // Authenticate WITH EMAIL (NOT USERNAME!)
	        authManager.authenticate(
	            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
	        );

	        // Generate JWT
	        var rolesList = u.getRoles().stream().map(r -> r.getName()).toList();
	        String token = jwtProvider.generateToken(u.getEmail(), rolesList);

	        return ResponseEntity.ok(new LoginResponse(token, rolesList, "Login successful"));
	    } catch (Exception e) {
	        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
	    }
	}

}