import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockLeads, LEAD_STATUSES } from '../data/mockData';

export const useLeadsStore = create(
  persist(
    (set, get) => ({
      leads: mockLeads,
      selectedLeads: [],
      filters: {
        status: '',
        search: '',
        region: '',
        assignedTo: '',
        dateRange: { start: '', end: '' }
      },
      sorting: {
        field: 'createdAt',
        direction: 'desc'
      },
      pagination: {
        page: 1,
        limit: 10,
        total: mockLeads.length
      },

      // Actions
      addLead: (lead) => {
        const newLead = {
          ...lead,
          id: `lead-${Date.now()}`,
          createdAt: new Date().toISOString().split('T')[0],
          lastContact: new Date().toISOString().split('T')[0]
        };
        set((state) => ({
          leads: [newLead, ...state.leads],
          pagination: { ...state.pagination, total: state.leads.length + 1 }
        }));
      },

      updateLead: (id, updates) => {
        set((state) => ({
          leads: state.leads.map(lead => 
            lead.id === id ? { ...lead, ...updates } : lead
          )
        }));
      },

      deleteLead: (id) => {
        set((state) => ({
          leads: state.leads.filter(lead => lead.id !== id),
          selectedLeads: state.selectedLeads.filter(leadId => leadId !== id),
          pagination: { ...state.pagination, total: state.leads.length - 1 }
        }));
      },

      bulkUpdateLeads: (leadIds, updates) => {
        set((state) => ({
          leads: state.leads.map(lead => 
            leadIds.includes(lead.id) ? { ...lead, ...updates } : lead
          )
        }));
      },

      bulkDeleteLeads: (leadIds) => {
        set((state) => ({
          leads: state.leads.filter(lead => !leadIds.includes(lead.id)),
          selectedLeads: [],
          pagination: { ...state.pagination, total: state.leads.length - leadIds.length }
        }));
      },

      setSelectedLeads: (leadIds) => {
        set({ selectedLeads: leadIds });
      },

      toggleLeadSelection: (leadId) => {
        set((state) => ({
          selectedLeads: state.selectedLeads.includes(leadId)
            ? state.selectedLeads.filter(id => id !== leadId)
            : [...state.selectedLeads, leadId]
        }));
      },

      selectAllLeads: (leadIds) => {
        set({ selectedLeads: leadIds });
      },

      clearSelection: () => {
        set({ selectedLeads: [] });
      },

      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
          pagination: { ...state.pagination, page: 1 }
        }));
      },

      clearFilters: () => {
        set({
          filters: {
            status: '',
            search: '',
            region: '',
            assignedTo: '',
            dateRange: { start: '', end: '' }
          },
          pagination: { page: 1, limit: 10, total: mockLeads.length }
        });
      },

      setSorting: (field, direction) => {
        set({ sorting: { field, direction } });
      },

      setPagination: (pagination) => {
        set((state) => ({
          pagination: { ...state.pagination, ...pagination }
        }));
      },

      // Computed getters
      getFilteredLeads: () => {
        const { leads, filters, sorting } = get();
        let filtered = [...leads];

        // Apply filters
        if (filters.status) {
          filtered = filtered.filter(lead => lead.status === filters.status);
        }

        if (filters.search) {
          const search = filters.search.toLowerCase();
          filtered = filtered.filter(lead => 
            lead.fullName.toLowerCase().includes(search) ||
            lead.email.toLowerCase().includes(search) ||
            lead.company.toLowerCase().includes(search) ||
            lead.jobTitle.toLowerCase().includes(search)
          );
        }

        if (filters.region) {
          filtered = filtered.filter(lead => lead.region === filters.region);
        }

        if (filters.assignedTo) {
          filtered = filtered.filter(lead => lead.assignedTo === filters.assignedTo);
        }

        if (filters.dateRange.start) {
          filtered = filtered.filter(lead => lead.createdAt >= filters.dateRange.start);
        }

        if (filters.dateRange.end) {
          filtered = filtered.filter(lead => lead.createdAt <= filters.dateRange.end);
        }

        // Apply sorting
        filtered.sort((a, b) => {
          const aValue = a[sorting.field];
          const bValue = b[sorting.field];
          
          if (sorting.direction === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });

        return filtered;
      },

      getPaginatedLeads: () => {
        const filtered = get().getFilteredLeads();
        const { pagination } = get();
        const start = (pagination.page - 1) * pagination.limit;
        const end = start + pagination.limit;
        
        return {
          leads: filtered.slice(start, end),
          total: filtered.length,
          pages: Math.ceil(filtered.length / pagination.limit)
        };
      },

      getLeadStats: () => {
        const { leads } = get();
        const stats = {};
        
        Object.keys(LEAD_STATUSES).forEach(status => {
          stats[status] = leads.filter(lead => lead.status === status).length;
        });

        stats.total = leads.length;
        stats.totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
        stats.avgValue = stats.total ? stats.totalValue / stats.total : 0;
        stats.conversionRate = stats.total ? (stats.CONVERTED / stats.total * 100).toFixed(1) : 0;

        return stats;
      },

      importLeads: (leadsData) => {
        set((state) => ({
          leads: [...state.leads, ...leadsData],
          pagination: { ...state.pagination, total: state.leads.length + leadsData.length }
        }));
      },

      exportLeads: (format = 'json') => {
        const { leads } = get();
        if (format === 'csv') {
          const headers = ['Tên', 'Email', 'Công ty', 'Chức vụ', 'Trạng thái', 'Giá trị', 'Ngày tạo'];
          const csvContent = [
            headers.join(','),
            ...leads.map(lead => [
              lead.fullName,
              lead.email,
              lead.company,
              lead.jobTitle,
              LEAD_STATUSES[lead.status].label,
              lead.value,
              lead.createdAt
            ].join(','))
          ].join('\n');
          return csvContent;
        }
        return JSON.stringify(leads, null, 2);
      }
    }),
    {
      name: 'leads-storage',
      partialize: (state) => ({ 
        leads: state.leads,
        filters: state.filters,
        sorting: state.sorting,
        pagination: state.pagination
      }),
    }
  )
);