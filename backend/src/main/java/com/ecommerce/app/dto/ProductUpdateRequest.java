package com.ecommerce.app.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ProductUpdateRequest {
    @Size(max = 255)
    private String name;

    @Size(max = 2000)
    private String description;

    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @Min(0)
    private Integer quantity;

    /**
     * If supplied (non-null), this list replaces the product's media list.
     * If null, media is left unchanged.
     */
    private List<@NotBlank String> mediaFilenames;
}
