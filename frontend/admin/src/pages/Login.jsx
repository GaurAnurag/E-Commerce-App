import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import API from '../api'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { saveSession } = useAuth()
    const navigate = useNavigate()
    async function submit(e) {
        e.preventDefault()
        setError(null)
        try {
            const res = await API.post('/api/auth/login', { email, password })
            const { token, roles } = res.data
            saveSession(token, roles)
            navigate('/admin')
        } catch (err) {
            setError(err?.response?.data?.error || 'Login failed')
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={submit} className="space-y-3">
                <div>
                    <label className="block text-sm">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-2 py-1" />
                </div>
                <div>
                    <label className="block text-sm">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-2 py-1" />
                </div>
                <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
                </div>
            </form>
        </div>
    )
}