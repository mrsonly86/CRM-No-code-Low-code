export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost' | 'won';

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source?: string;
  createdAt: string;
  notes?: string;
}

