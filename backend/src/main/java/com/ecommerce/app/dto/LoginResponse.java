package com.ecommerce.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter @AllArgsConstructor
public class LoginResponse {
    private String token;
    private List<String> roles;
    private String message;
}
