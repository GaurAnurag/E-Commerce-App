package com.ecommerce.app.dto;
import lombok.AllArgsConstructor; import lombok.Getter; import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String role;
}
