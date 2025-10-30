import React, { useEffect, useState } from 'react'
import API from '../../api'
import { Link, useNavigate } from 'react-router-dom'
export default function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => { load() }, [])
    async function load() {
        setLoading(true)
        try {
            const res = await API.get('/api/products')
            // backend returns list where media is stream mapping — ensure structure safe
            const data = res.data.map(p => ({
                id: p.id,
                name: p.name,
                description: p.description,
                media: (p.media || []).map(m => ({ url: (m.url || m) }))
            }))
            setProducts(data)
        } finally { setLoading(false) }
    }
    async function remove(id) {
        if (!confirm('Delete product?')) return
        await API.delete(`/api/admin/products/${id}`)
        load()
    }
    if (loading) return <div>Loading...</div>
    return (
        <div className="space-y-4">
            {products.length === 0 && <div>No products</div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(p => (
                    <div key={p.id} className="bg-white p-3 rounded shadow">
                        {p.media && p.media[0] && <img src={`http://localhost:8080${p.media[0].url}`} alt="thumb" className="h-40 w-full object-cover mb-2 rounded" />}
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.description}</p>
                        <div className="mt-3 flex gap-2">
                            <button onClick={() => navigate(`edit/${p.id}`)} className="px-3 py-1 border rounded">Edit</button>
                            <button onClick={() => remove(p.id)} className="px-3 py-1 border rounded text-red-600">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}