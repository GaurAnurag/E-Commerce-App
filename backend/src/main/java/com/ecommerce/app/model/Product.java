package com.ecommerce.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(length = 2000)
	private String description;

	@Column(precision = 12, scale = 2)
	private BigDecimal price;

	private Integer quantity;
	private boolean active = true;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderColumn(name = "media_order")
	private List<ProductMedia> media = new ArrayList<>();

	public void addMedia(ProductMedia m) {
		media.add(m);
		m.setProduct(this);
	}

	public void removeMedia(ProductMedia m) {
		media.remove(m);
		m.setProduct(null);
	}
}