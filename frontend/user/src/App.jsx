import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import AuthPage from "./pages/AuthPage";

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/products/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <footer className="bg-white border-t mt-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  © 2025 E-Shop. All rights reserved.
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
