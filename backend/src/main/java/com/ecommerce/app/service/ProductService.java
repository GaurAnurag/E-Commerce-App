package com.ecommerce.app.service;

import com.ecommerce.app.dto.ProductRequest;
import com.ecommerce.app.dto.ProductUpdateRequest;
import com.ecommerce.app.model.*;
import com.ecommerce.app.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) { this.productRepository = productRepository; }

    public Product createProduct(ProductRequest request) {
        Product p = new Product();
        p.setName(request.getName());
        p.setDescription(request.getDescription());
        p.setPrice(request.getPrice());
        p.setQuantity(request.getQuantity());

        List<String> files = Optional.ofNullable(request.getMediaFilenames()).orElse(Collections.emptyList());
        for (String fn : files) {
            ProductMedia m = new ProductMedia();
            m.setFilename(fn);
            p.addMedia(m);
        }
        return productRepository.save(p);
    }

    public Product updateProduct(Long id, ProductUpdateRequest request) {
        Product p = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        if (request.getName() != null) p.setName(request.getName());
        if (request.getDescription() != null) p.setDescription(request.getDescription());
        if (request.getPrice() != null) p.setPrice(request.getPrice());
        if (request.getQuantity() != null) p.setQuantity(request.getQuantity());

        if (request.getMediaFilenames() != null) {
            List<String> newFiles = request.getMediaFilenames();
            Map<String, ProductMedia> existing = p.getMedia().stream()
                    .collect(Collectors.toMap(ProductMedia::getFilename, m -> m));
            p.getMedia().clear();
            for (String fn : newFiles) {
                if (existing.containsKey(fn)) {
                    p.addMedia(existing.get(fn));
                } else {
                    ProductMedia m = new ProductMedia();
                    m.setFilename(fn);
                    p.addMedia(m);
                }
            }
        }
        return productRepository.save(p);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> listAll() {
        return productRepository.findAll();
    }

    public Optional<Product> getPublic(Long id) {
        return productRepository.findById(id);
    }
}
