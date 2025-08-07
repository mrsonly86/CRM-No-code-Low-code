import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useSettingsStore } from '../store/settingsStore';
import { useAuthStore } from '../store/authStore';
import { 
  User, 
  Bell, 
  Monitor, 
  Palette, 
  Globe, 
  Database,
  Bot,
  Download,
  Shield,
  Save,
  RefreshCw
} from 'lucide-react';

export default function Settings() {
  const {
    theme,
    language,
    currency,
    notifications,
    dashboard,
    table,
    ai,
    export: exportSettings,
    setTheme,
    setLanguage,
    setCurrency,
    updateNotifications,
    updateDashboard,
    updateTable,
    updateAI,
    updateExport,
    resetToDefaults
  } = useSettingsStore();

  const { user, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    company: '',
    position: ''
  });

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: User },
    { id: 'appearance', label: 'Giao diện', icon: Palette },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'dashboard', label: 'Dashboard', icon: Monitor },
    { id: 'ai', label: 'AI & Tự động hóa', icon: Bot },
    { id: 'data', label: 'Dữ liệu', icon: Database },
    { id: 'security', label: 'Bảo mật', icon: Shield }
  ];

  const handleSaveProfile = () => {
    updateProfile({
      name: profileData.name,
      email: profileData.email
    });
    // Show success message
  };

  return (
    <Layout currentPath="/settings">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cài đặt</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý tài khoản và tùy chỉnh ứng dụng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-primary text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Thông tin cá nhân
                  </h3>
                  
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <button className="btn btn-outline btn-sm">
                        Thay đổi ảnh
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG tối đa 5MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Họ và tên</span>
                      </label>
                      <input 
                        type="text" 
                        className="input input-bordered w-full"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input 
                        type="email" 
                        className="input input-bordered w-full"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Số điện thoại</span>
                      </label>
                      <input 
                        type="tel" 
                        className="input input-bordered w-full"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Công ty</span>
                      </label>
                      <input 
                        type="text" 
                        className="input input-bordered w-full"
                        value={profileData.company}
                        onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button className="btn btn-outline">Hủy</button>
                    <button className="btn btn-primary" onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Giao diện
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Chủ đề</span>
                      </label>
                      <div className="flex space-x-4">
                        <label className="cursor-pointer">
                          <input 
                            type="radio" 
                            name="theme" 
                            className="radio radio-primary"
                            checked={theme === 'light'}
                            onChange={() => setTheme('light')}
                          />
                          <span className="ml-2">Sáng</span>
                        </label>
                        <label className="cursor-pointer">
                          <input 
                            type="radio" 
                            name="theme" 
                            className="radio radio-primary"
                            checked={theme === 'dark'}
                            onChange={() => setTheme('dark')}
                          />
                          <span className="ml-2">Tối</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Ngôn ngữ</span>
                      </label>
                      <select 
                        className="select select-bordered w-full max-w-xs"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      >
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Đơn vị tiền tệ</span>
                      </label>
                      <select 
                        className="select select-bordered w-full max-w-xs"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value="VND">VND (₫)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Cài đặt thông báo
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries({
                      email: 'Thông báo qua Email',
                      push: 'Thông báo Push',
                      desktop: 'Thông báo Desktop',
                      newLeads: 'Leads mới',
                      statusChanges: 'Thay đổi trạng thái',
                      deadlines: 'Deadline sắp tới',
                      dailyReport: 'Báo cáo hằng ngày'
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {label}
                        </span>
                        <input 
                          type="checkbox" 
                          className="toggle toggle-primary"
                          checked={notifications[key]}
                          onChange={(e) => updateNotifications({ [key]: e.target.checked })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Cài đặt Dashboard
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Hiệu ứng biểu đồ
                      </span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-primary"
                        checked={dashboard.chartsAnimated}
                        onChange={(e) => updateDashboard({ chartsAnimated: e.target.checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Hiển thị lời chào
                      </span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-primary"
                        checked={dashboard.showGreeting}
                        onChange={(e) => updateDashboard({ showGreeting: e.target.checked })}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Tự động refresh (giây)</span>
                      </label>
                      <input 
                        type="number" 
                        className="input input-bordered w-full max-w-xs"
                        value={dashboard.refreshInterval / 1000}
                        onChange={(e) => updateDashboard({ refreshInterval: parseInt(e.target.value) * 1000 })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* AI Tab */}
              {activeTab === 'ai' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI & Tự động hóa
                  </h3>
                  
                  <div className="space-y-4">
                    {Object.entries({
                      enabled: 'Bật tính năng AI',
                      autoSuggestions: 'Gợi ý tự động',
                      predictiveAnalytics: 'Phân tích dự đoán',
                      autoLeadScoring: 'Chấm điểm lead tự động',
                      smartNotifications: 'Thông báo thông minh'
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {label}
                          </span>
                          {key === 'enabled' && (
                            <p className="text-xs text-gray-500">
                              Tắt để vô hiệu hóa tất cả tính năng AI
                            </p>
                          )}
                        </div>
                        <input 
                          type="checkbox" 
                          className="toggle toggle-primary"
                          checked={ai[key]}
                          onChange={(e) => updateAI({ [key]: e.target.checked })}
                          disabled={key !== 'enabled' && !ai.enabled}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Tab */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quản lý dữ liệu
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Xuất dữ liệu
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="label">
                            <span className="label-text">Định dạng mặc định</span>
                          </label>
                          <select 
                            className="select select-bordered w-full max-w-xs"
                            value={exportSettings.defaultFormat}
                            onChange={(e) => updateExport({ defaultFormat: e.target.value })}
                          >
                            <option value="csv">CSV</option>
                            <option value="xlsx">Excel</option>
                            <option value="json">JSON</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Bao gồm header
                          </span>
                          <input 
                            type="checkbox" 
                            className="toggle toggle-primary"
                            checked={exportSettings.includeHeaders}
                            onChange={(e) => updateExport({ includeHeaders: e.target.checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Backup & Restore
                      </h4>
                      <div className="space-y-3">
                        <button className="btn btn-outline">
                          <Download className="w-4 h-4 mr-2" />
                          Tải backup
                        </button>
                        <button className="btn btn-outline">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Khôi phục dữ liệu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Bảo mật
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Đổi mật khẩu
                      </h4>
                      <div className="space-y-3 max-w-md">
                        <input 
                          type="password" 
                          placeholder="Mật khẩu hiện tại"
                          className="input input-bordered w-full"
                        />
                        <input 
                          type="password" 
                          placeholder="Mật khẩu mới"
                          className="input input-bordered w-full"
                        />
                        <input 
                          type="password" 
                          placeholder="Xác nhận mật khẩu mới"
                          className="input input-bordered w-full"
                        />
                        <button className="btn btn-primary">
                          Cập nhật mật khẩu
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Phiên đăng nhập
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Chrome trên Windows
                            </p>
                            <p className="text-xs text-gray-500">
                              IP: 192.168.1.100 • Hiện tại
                            </p>
                          </div>
                          <button className="btn btn-outline btn-sm">
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reset Settings */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                      Đặt lại cài đặt
                    </h4>
                    <p className="text-sm text-gray-500">
                      Khôi phục tất cả cài đặt về mặc định
                    </p>
                  </div>
                  <button 
                    className="btn btn-error btn-outline"
                    onClick={resetToDefaults}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Đặt lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}