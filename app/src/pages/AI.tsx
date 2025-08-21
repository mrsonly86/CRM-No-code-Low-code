import { useState } from 'react'
import { useLeadsStore } from '../store/leads'

export default function AI() {
  const leads = useLeadsStore(s => s.leads)
  const [prompt, setPrompt] = useState('How many leads do we have?')
  const [answer, setAnswer] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function ask() {
    setLoading(true)
    setError(null)
    setAnswer('')
    try {
      const res = await fetch('/.netlify/functions/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, leads }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setAnswer(data.answer)
    } catch (e: any) {
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">AI Assistant</h1>
      <div className="bg-white border rounded p-4 space-y-3">
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className="w-full border rounded px-3 py-2 min-h-24" />
        <button onClick={ask} disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50">
          {loading ? 'Asking...' : 'Ask'}
        </button>
        {answer && <div className="p-3 bg-green-50 border rounded">{answer}</div>}
        {error && <div className="p-3 bg-red-50 border rounded text-red-700">{error}</div>}
      </div>
    </div>
  )
}

