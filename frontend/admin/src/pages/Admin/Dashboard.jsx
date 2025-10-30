import { Routes, Route, Link } from 'react-router-dom'
import ProductList from './ProductList'
import ProductForm from './ProductForm'
export default function AdminDashboard() {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <nav className="space-x-2">
                    <Link to="." className="underline">Products</Link>
                    <Link to="add" className="underline">Add Product</Link>
                </nav>
            </div>
            <div>
                <Routes>
                    <Route index element={<ProductList />} />
                    <Route path="add" element={<ProductForm />} />
                    <Route path="edit/:id" element={<ProductForm />} />
                </Routes>
            </div>
        </div>
    )
}