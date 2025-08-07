import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'vi',
      currency: 'VND',
      timeZone: 'Asia/Ho_Chi_Minh',
      dateFormat: 'dd/MM/yyyy',
      notifications: {
        email: true,
        push: true,
        desktop: true,
        newLeads: true,
        statusChanges: true,
        deadlines: true,
        dailyReport: true
      },
      dashboard: {
        refreshInterval: 30000, // 30 seconds
        chartsAnimated: true,
        showGreeting: true,
        defaultView: 'overview'
      },
      table: {
        itemsPerPage: 10,
        showPagination: true,
        compactMode: false,
        stickyHeader: true
      },
      ai: {
        enabled: true,
        autoSuggestions: true,
        predictiveAnalytics: true,
        autoLeadScoring: true,
        smartNotifications: true
      },
      export: {
        defaultFormat: 'csv',
        includeHeaders: true,
        dateRangeDefault: 30 // days
      },

      // Actions
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      setLanguage: (language) => {
        set({ language });
      },

      setCurrency: (currency) => {
        set({ currency });
      },

      setTimeZone: (timeZone) => {
        set({ timeZone });
      },

      setDateFormat: (dateFormat) => {
        set({ dateFormat });
      },

      updateNotifications: (notifications) => {
        set((state) => ({
          notifications: { ...state.notifications, ...notifications }
        }));
      },

      updateDashboard: (dashboard) => {
        set((state) => ({
          dashboard: { ...state.dashboard, ...dashboard }
        }));
      },

      updateTable: (table) => {
        set((state) => ({
          table: { ...state.table, ...table }
        }));
      },

      updateAI: (ai) => {
        set((state) => ({
          ai: { ...state.ai, ...ai }
        }));
      },

      updateExport: (exportSettings) => {
        set((state) => ({
          export: { ...state.export, ...exportSettings }
        }));
      },

      resetToDefaults: () => {
        set({
          theme: 'light',
          language: 'vi',
          currency: 'VND',
          timeZone: 'Asia/Ho_Chi_Minh',
          dateFormat: 'dd/MM/yyyy',
          notifications: {
            email: true,
            push: true,
            desktop: true,
            newLeads: true,
            statusChanges: true,
            deadlines: true,
            dailyReport: true
          },
          dashboard: {
            refreshInterval: 30000,
            chartsAnimated: true,
            showGreeting: true,
            defaultView: 'overview'
          },
          table: {
            itemsPerPage: 10,
            showPagination: true,
            compactMode: false,
            stickyHeader: true
          },
          ai: {
            enabled: true,
            autoSuggestions: true,
            predictiveAnalytics: true,
            autoLeadScoring: true,
            smartNotifications: true
          },
          export: {
            defaultFormat: 'csv',
            includeHeaders: true,
            dateRangeDefault: 30
          }
        });
      },

      // Getters
      getFormattedCurrency: (amount) => {
        const { currency } = get();
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(amount);
      },

      getFormattedDate: (date) => {
        const { dateFormat, timeZone } = get();
        return new Intl.DateTimeFormat('vi-VN', {
          timeZone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(new Date(date));
      },

      shouldShowNotification: (type) => {
        const { notifications } = get();
        return notifications[type] || false;
      }
    }),
    {
      name: 'settings-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        currency: state.currency,
        timeZone: state.timeZone,
        dateFormat: state.dateFormat,
        notifications: state.notifications,
        dashboard: state.dashboard,
        table: state.table,
        ai: state.ai,
        export: state.export
      }),
    }
  )
);