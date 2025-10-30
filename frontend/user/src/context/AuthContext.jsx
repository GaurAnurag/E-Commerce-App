// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [roles, setRoles] = useState(() => {
    try { return JSON.parse(localStorage.getItem("roles") || "[]"); } catch { return []; }
  });

  const navigate = useNavigate();

  // ensure axios header matches stored token
  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles || []));
  }, [roles]);

  const login = ({ token: newToken, roles: newRoles = [] }) => {
    setToken(newToken);
    // backend returns roles as array e.g. ["ROLE_USER"].
    setRoles(Array.isArray(newRoles) ? newRoles : (typeof newRoles === "string" ? newRoles.split(",").map(s=>s.trim()) : []));
  };

  const logout = () => {
    setToken(null);
    setRoles([]);
    setAuthToken(null); 
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    navigate("/");
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, roles, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
