import { useEffect, useMemo, useState } from 'react';
import { create } from 'zustand';

type Lead = {
  id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Won' | 'Lost';
  owner: string;
};

type LeadsState = {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
};

const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],
  addLead: (lead) => set((s) => ({ leads: [lead, ...s.leads] })),
  updateLead: (id, updates) => set((s) => ({
    leads: s.leads.map(l => l.id === id ? { ...l, ...updates } : l)
  })),
  deleteLead: (id) => set((s) => ({ leads: s.leads.filter(l => l.id !== id) }))
}));

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

export function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeadsStore();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    if (leads.length === 0) {
      const seed: Lead[] = [
        { id: randomId(), name: 'Acme Corp', email: 'sales@acme.com', status: 'New', owner: 'Alice' },
        { id: randomId(), name: 'Beta LLC', email: 'info@beta.io', status: 'Contacted', owner: 'Bob' },
        { id: randomId(), name: 'Delta Inc', email: 'contact@delta.ai', status: 'Qualified', owner: 'Carol' }
      ];
      seed.forEach(addLead);
    }
  }, [leads.length, addLead]);

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const matchesQuery = query.trim() === '' ||
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === '' || l.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [leads, query, statusFilter]);

  return (
    <div className="stack gap-lg">
      <div className="row gap-sm">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search leads"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
        <button onClick={() => addLead({ id: randomId(), name: 'New Lead', email: 'lead@example.com', status: 'New', owner: 'You' })}>
          + Add Lead
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id}>
                <td>{l.name}</td>
                <td>{l.email}</td>
                <td>
                  <select value={l.status} onChange={(e) => updateLead(l.id, { status: e.target.value as Lead['status'] })}>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Won</option>
                    <option>Lost</option>
                  </select>
                </td>
                <td>{l.owner}</td>
                <td>
                  <button className="danger" onClick={() => deleteLead(l.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

