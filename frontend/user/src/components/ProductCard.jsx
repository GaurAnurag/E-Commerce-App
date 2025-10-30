// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../api/axios";

export default function ProductCard({ product }) {
  const media = product.media && product.media.length ? product.media[0] : null;
  const imageUrl = media ? `${API_BASE}${media.url}` : null;

  const price = product.price != null ? Number(product.price) : null;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <Link to={`/products/${product.id}`} className="block">
        {imageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400">
            {/* placeholder icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          {price != null && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-blue-600">
                ₹{price.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {product.category || ""}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
