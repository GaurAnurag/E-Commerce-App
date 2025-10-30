import React, { useEffect, useState } from 'react'
import API from '../../api'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [files, setFiles] = useState([])
  const [uploaded, setUploaded] = useState([]) 
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) load()
  }, [id])

  async function load() {
    const res = await API.get(`/api/products/${id}`)
    const p = res.data
    setName(p.name)
    setDescription(p.description)
    setPrice(p.price)
    setQuantity(p.quantity)
    setUploaded((p.media || []).map(m => m.url.replace('/uploads/', '')))
  }

  async function handleUpload() {
  if (!files.length) return;
  setLoading(true);
  try {
    const fd = new FormData();
    for (const f of files) {
      fd.append("files", f);
    }
    const res = await API.post("/api/admin/products/upload", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setUploaded([...uploaded, ...res.data.filenames]);
    setFiles([]);
  } finally {
    setLoading(false);
  }
}


  async function submit(e) {
    e.preventDefault()
    const payload = {
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      mediaFilenames: uploaded
    }
    if (id) {
      await API.put(`/api/admin/products/${id}`, payload)
    } else {
      await API.post('/api/admin/products', payload)
    }
    navigate('/admin')
  }

  function removeMedia(fn) {
    setUploaded(u => u.filter(x => x !== fn))
  }

  return (
    <div className="max-w-3xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{id ? 'Edit' : 'Add'} Product</h2>
      <form onSubmit={submit} className="space-y-3">

        <div>
          <label className="block text-sm">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border rounded px-2 py-1"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Price</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm">Upload Media (select multiple)</label>
          <input type="file" multiple onChange={e => setFiles(e.target.files)} />
          <div className="mt-2">
            <button
              type="button"
              onClick={handleUpload}
              className="px-3 py-1 border rounded"
            >
              Upload Selected
            </button>
            {loading && <span className="ml-2">Uploading...</span>}
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-sm">Uploaded files</label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {uploaded.map(u => (
              <div key={u} className="p-2 border rounded">
                <img
                  src={`http://localhost:8080/uploads/${u}`}
                  alt="media"
                  className="h-20 w-24 object-cover block mb-1"
                />
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => removeMedia(u)}
                    className="text-sm text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {uploaded.length === 0 && (
              <div className="text-sm text-gray-500">No media uploaded</div>
            )}
          </div>
        </div>

        <div>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
