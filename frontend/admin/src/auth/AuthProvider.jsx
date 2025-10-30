import React, { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import API from '../api' // ✅ use the same axios instance

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem('token')
    const roles = JSON.parse(localStorage.getItem('roles') || 'null')
    return t ? { token: t, roles } : null
  })

  useEffect(() => {
    // ✅ Attach interceptor to API, not global axios
    const req = API.interceptors.request.use(cfg => {
      if (token) cfg.headers['Authorization'] = `Bearer ${token}`
      return cfg
    })
    return () => API.interceptors.request.eject(req)
  }, [token])

  function saveSession(token, roles) {
    localStorage.setItem('token', token)
    localStorage.setItem('roles', JSON.stringify(roles))
    setToken(token)
    setUser({ token, roles })
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('roles')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, saveSession, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
