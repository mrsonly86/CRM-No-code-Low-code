import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        id: 'user-1',
        name: 'Nguyễn Văn Admin',
        email: 'admin@crm-system.vn',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+Admin&background=6366f1&color=fff',
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'admin']
      },
      isAuthenticated: true,
      permissions: ['read', 'write', 'delete', 'admin'],

      // Actions
      login: (credentials) => {
        // Simulate login
        set({
          user: {
            id: 'user-1',
            name: credentials.name || 'Nguyễn Văn Admin',
            email: credentials.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name || 'Admin')}&background=6366f1&color=fff`,
            role: 'admin',
            permissions: ['read', 'write', 'delete', 'admin']
          },
          isAuthenticated: true,
          permissions: ['read', 'write', 'delete', 'admin']
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          permissions: []
        });
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates }
        }));
      },

      hasPermission: (permission) => {
        const { permissions } = get();
        return permissions.includes(permission) || permissions.includes('admin');
      },

      canRead: () => get().hasPermission('read'),
      canWrite: () => get().hasPermission('write'),
      canDelete: () => get().hasPermission('delete'),
      isAdmin: () => get().hasPermission('admin')
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        permissions: state.permissions
      }),
    }
  )
);