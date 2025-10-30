import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar(){
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        <Link 
          to="/" 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all"
        >
          E-Shop
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          {!isLoggedIn && (
            <Link 
              to="/auth" 
              className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign in
            </Link>
          )}
          {isLoggedIn && (
            <button 
              onClick={logout} 
              className="text-sm font-medium px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
