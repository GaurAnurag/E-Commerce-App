import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import ProductViewer from './pages/ProductViewer'
import AdminDashboard from './pages/Admin/Dashboard'
import { useAuth } from './auth/AuthProvider'
export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">E-Shop</Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm">Products</Link>
            {user?.roles?.includes('ROLE_ADMIN') ? (
              <>
                <Link to="/admin" className="text-sm">Admin</Link>
                <button onClick={logout} className="text-sm underline">Logout</button>
              </>
            ) : (
              <Link to="/login" className="text-sm">Admin Login</Link>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<ProductViewer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  )
}