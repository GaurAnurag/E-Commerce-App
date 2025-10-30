package com.ecommerce.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.ecommerce.app.dto.ProductRequest;
import com.ecommerce.app.dto.ProductUpdateRequest;
import com.ecommerce.app.model.Product;
import com.ecommerce.app.service.FileStorageService;
import com.ecommerce.app.service.ProductService;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/products")
@PreAuthorize("hasRole('ADMIN')")
public class ProductAdminController {
	private final ProductService productService;
	private final FileStorageService fileStorageService;

	public ProductAdminController(ProductService productService, FileStorageService fileStorageService) {
		this.productService = productService;
		this.fileStorageService = fileStorageService;
	}

	@PostMapping("/upload")
	public ResponseEntity<?> uploadMedia(@RequestParam("files") MultipartFile[] files) {
	    if (files == null || files.length == 0) {
	        return ResponseEntity.badRequest().body(Map.of("error", "No files provided"));
	    }

	    var uploaded = new java.util.ArrayList<String>();
	    for (MultipartFile file : files) {
	        String filename = fileStorageService.storeFile(file);
	        uploaded.add(filename);
	    }

	    return ResponseEntity.ok(Map.of("filenames", uploaded));
	}
	@PostMapping
	public ResponseEntity<?> create(@RequestBody ProductRequest request) {
		Product saved = productService.createProduct(request);
		return ResponseEntity.status(201).body(Map.of("id", saved.getId()));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProductUpdateRequest request) {
		Product updated = productService.updateProduct(id, request);
		return ResponseEntity.ok(Map.of("id", updated.getId()));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity.noContent().build();
	}
}