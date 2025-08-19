import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { useLeadsStore } from '../store/leads'
import type { LeadStatus } from '../types'

const statuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'lost', 'won']

export default function Leads() {
  const { leads, addLead, deleteLead, setStatus } = useLeadsStore()
  const [query, setQuery] = useState('')
  const [status, setStatusFilter] = useState<LeadStatus | 'all'>('all')

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const matchesQuery = [l.name, l.email, l.source, l.notes]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(query.toLowerCase()))
      const matchesStatus = status === 'all' ? true : l.status === status
      return matchesQuery && matchesStatus
    })
  }, [leads, query, status])

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const source = String(form.get('source') || '')
    if (!name || !email) return
    addLead({ name, email, source, status: 'new', notes: '' })
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Leads</h1>

      <form onSubmit={onSubmit} className="bg-white border rounded p-4 grid gap-3 sm:grid-cols-5">
        <input className="border rounded px-3 py-2 sm:col-span-1" name="name" placeholder="Name" />
        <input className="border rounded px-3 py-2 sm:col-span-1" name="email" placeholder="Email" />
        <input className="border rounded px-3 py-2 sm:col-span-1" name="source" placeholder="Source" />
        <button className="bg-blue-600 text-white rounded px-4 py-2 sm:col-span-1" type="submit">Add</button>
      </form>

      <div className="flex flex-wrap gap-2 items-center">
        <input value={query} onChange={e => setQuery(e.target.value)} className="border rounded px-3 py-2" placeholder="Search..." />
        <select value={status} onChange={e => setStatusFilter(e.target.value as any)} className="border rounded px-3 py-2">
          <option value="all">All statuses</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-sm text-gray-500">{filtered.length} results</span>
      </div>

      <div className="bg-white border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Source</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-t">
                <td className="p-2">{l.name}</td>
                <td className="p-2">{l.email}</td>
                <td className="p-2">{l.source || '-'}</td>
                <td className="p-2">
                  <select value={l.status} onChange={e => setStatus(l.id, e.target.value as LeadStatus)} className="border rounded px-2 py-1">
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-2">
                  <button className="text-red-600 hover:underline" onClick={() => deleteLead(l.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={5}>No leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

