import { useMemo } from 'react'
import { useLeadsStore } from '../store/leads'

export default function Dashboard() {
  const leads = useLeadsStore(s => s.leads)

  const stats = useMemo(() => {
    const total = leads.length
    const byStatus = leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.status] = (acc[l.status] || 0) + 1
      return acc
    }, {})
    const createdThisWeek = leads.filter(l => {
      const d = new Date(l.createdAt).getTime()
      const now = Date.now()
      return now - d < 7 * 24 * 60 * 60 * 1000
    }).length
    return { total, byStatus, createdThisWeek }
  }, [leads])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Leads" value={String(stats.total)} />
        <Card title="New This Week" value={String(stats.createdThisWeek)} />
        <Card title="Qualified" value={String(stats.byStatus['qualified'] || 0)} />
      </div>
      <div className="bg-white border rounded p-4">
        <h2 className="font-semibold mb-2">By Status</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(stats.byStatus).map(([k, v]) => (
            <span key={k} className="px-3 py-1 rounded bg-gray-100 text-sm">{k}: {v}</span>
          ))}
          {Object.keys(stats.byStatus).length === 0 && (
            <p className="text-sm text-gray-500">No leads yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border rounded p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  )
}

