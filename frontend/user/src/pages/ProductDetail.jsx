import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/product";

export default function ProductDetail(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchProduct(id).then(data => setP(data)).catch(()=>setP(null)).finally(()=>setLoading(false));
  },[id]);

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          {/* Breadcrumb skeleton */}
          <div className="h-4 bg-gray-200 w-32 rounded mb-8"></div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Media skeleton */}
            <div>
              <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(n => (
                  <div key={n} className="aspect-square bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 w-3/4 rounded"></div>
                <div className="h-6 bg-gray-200 w-1/4 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
                <div className="h-4 bg-gray-200 w-4/6 rounded"></div>
              </div>
              <div className="pt-6 flex gap-4">
                <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!p) return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the product you're looking for. It might have been removed or is no longer available.</p>
        <a href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
          Return to Homepage
        </a>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-blue-600 hover:text-blue-700">Home</a>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-600">{p.category || 'Products'}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Media Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              {p.media && p.media.length ? (
                p.media.map((m, idx) => (
                  m.type && m.type.includes("video") ? (
                    <video key={idx} controls className="w-full aspect-video">
                      <source src={`${import.meta.env.VITE_API_BASE}${m.url}`} type={m.type} />
                    </video>
                  ) : (
                    <img 
                      key={idx} 
                      src={`${import.meta.env.VITE_API_BASE}${m.url}`} 
                      alt={p.name} 
                      className="w-full aspect-square object-cover" 
                    />
                  )
                ))[0] // Show only the first media item as main display
              ) : (
                <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {p.media && p.media.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {p.media.map((m, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all">
                    {m.type && m.type.includes("video") ? (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    ) : (
                      <img 
                        src={`${import.meta.env.VITE_API_BASE}${m.url}`} 
                        alt={`${p.name} - view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900 flex-grow">{p.name}</h1>
                {p.category && (
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {p.category}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 py-2">
                <div className="flex-grow">
                  <span className="text-3xl font-bold text-blue-600">
                    {p.price ? `₹${Number(p.price).toFixed(2)}` : "Price on request"}
                  </span>
                  {p.price && (
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-green-600 font-medium">✓ In Stock</span>
                      <span className="text-sm text-gray-500">|</span>
                      <span className="text-sm text-gray-500">Fast Delivery Available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-blue max-w-none bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About this item</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {p.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Highlights</h3>
              <ul className="grid gap-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Genuine Product with Manufacturer Warranty</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">7 Days Easy Return Policy</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Secure Payment Options</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex gap-4">
              <button 
                className="flex-1 bg-blue-600 text-white rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                onClick={() => {}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Buy Now
              </button>
              
              <button 
                className="flex-1 border border-gray-300 bg-white text-gray-700 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                onClick={() => {}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
            </div>

            {/* Additional Info */}
            {(p.features || p.specifications) && (
              <div className="pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div className="space-y-4">
                  {p.features && (
                    <div className="text-gray-600">
                      <ul className="list-disc list-inside space-y-2">
                        {p.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {p.specifications && (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(p.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500">{key}:</span>
                          <span className="text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>  
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
