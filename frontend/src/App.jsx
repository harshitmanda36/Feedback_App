import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export default function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', rating: 5, comment: '' })
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/feedback`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(''); setOk('')
    if (!form.name || !form.email || !form.comment) {
      setError('Please fill all required fields')
      return
    }
    try {
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: Number(form.rating) })
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'Submit failed')
      }
      setForm({ name: '', email: '', rating: 5, comment: '' })
      setOk('Thanks for your feedback!')
      await load()
      setTimeout(() => setOk(''), 2000)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="container">
      <h1>Feedback</h1>
      <form className="card" onSubmit={onSubmit}>
        <div className="row">
          <label>Name*</label>
          <input name="name" value={form.name} onChange={onChange} placeholder="Your name" />
        </div>
        <div className="row">
          <label>Email*</label>
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
        </div>
        <div className="row">
          <label>Rating</label>
          <select name="rating" value={form.rating} onChange={onChange}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="row">
          <label>Comment*</label>
          <textarea name="comment" value={form.comment} onChange={onChange} placeholder="Share your thoughts" rows={4} />
        </div>
        <button type="submit">Submit</button>
        {error && <p className="error">{error}</p>}
        {ok && <p className="ok">{ok}</p>}
      </form>

      <h2>Recent feedback</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="list">
          {items.map(it => (
            <li key={it.id} className="item">
              <div className="head">
                <strong>{it.name}</strong> • <span>{it.email}</span> • <em>{new Date(it.createdAt).toLocaleString()}</em>
              </div>
              <div>Rating: {it.rating} / 5</div>
              <p>{it.comment}</p>
            </li>
          ))}
          {items.length === 0 && <p>No feedback yet.</p>}
        </ul>
      )}
    </div>
  )
}
