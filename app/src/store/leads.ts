import { create } from 'zustand'
import type { Lead, LeadStatus } from '../types'

const STORAGE_KEY = 'crm_leads_v1'

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function loadFromStorage(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveToStorage(leads: Lead[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  } catch {
    // ignore
  }
}

interface LeadsState {
  leads: Lead[]
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  deleteLead: (id: string) => void
  setStatus: (id: string, status: LeadStatus) => void
}

export const useLeadsStore = create<LeadsState>((set, get) => ({
  leads: typeof window !== 'undefined' ? loadFromStorage() : [],
  addLead: (lead) => {
    const newLead: Lead = { ...lead, id: generateId(), createdAt: new Date().toISOString() }
    const next = [newLead, ...get().leads]
    saveToStorage(next)
    set({ leads: next })
  },
  updateLead: (id, updates) => {
    const next = get().leads.map(l => l.id === id ? { ...l, ...updates } : l)
    saveToStorage(next)
    set({ leads: next })
  },
  deleteLead: (id) => {
    const next = get().leads.filter(l => l.id !== id)
    saveToStorage(next)
    set({ leads: next })
  },
  setStatus: (id, status) => {
    const next = get().leads.map(l => l.id === id ? { ...l, status } : l)
    saveToStorage(next)
    set({ leads: next })
  },
}))

