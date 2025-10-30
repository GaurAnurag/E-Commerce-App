import React, { useEffect, useState } from 'react'
import API from '../api'
export default function ProductViewer() {
    const [products, setProducts] = useState([])
    useEffect(() => { load() }, [])
    async function load() {
        const res = await API.get('/api/products')
        const data = res.data.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            quantity: p.quantity,
            media: (p.media || []).map(m => ({ url: (m.url || m) }))
        }))
        setProducts(data)
    }
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(p => (
                    <div key={p.id} className="bg-white p-3 rounded shadow">
                        {p.media && p.media[0] && <img src={`http://localhost:8080${p.media[0].url}`} alt="thumb" className="h-40 w-full object-cover mb-2 rounded" />}
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.description}</p>
                        <div className="mt-2 text-sm text-gray-800">Price: {p.price}</div>
                        <div className="text-sm text-gray-600">Qty: {p.quantity}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}