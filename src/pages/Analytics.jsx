import React from 'react';
import Layout from '../components/Layout/Layout';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import LineChart from '../components/Charts/LineChart';
import MetricCard from '../components/Dashboard/MetricCard';
import { 
  chartData, 
  dashboardMetrics,
  calculateMetrics 
} from '../data/mockData';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Calendar,
  Filter,
  Download
} from 'lucide-react';

export default function Analytics() {
  const metrics = calculateMetrics();

  const analyticsMetrics = [
    {
      title: 'Tổng Leads',
      value: metrics.total,
      change: 8.2,
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Đã chuyển đổi',
      value: metrics.converted,
      change: 12.5,
      changeType: 'positive',
      icon: Target
    },
    {
      title: 'Tỷ lệ chuyển đổi',
      value: metrics.conversionRate,
      change: 2.1,
      changeType: 'positive',
      icon: TrendingUp,
      suffix: '%'
    },
    {
      title: 'Giá trị Pipeline',
      value: metrics.pipelineValue,
      change: 15.3,
      changeType: 'positive',
      icon: DollarSign,
      isCurrency: true
    }
  ];

  return (
    <Layout currentPath="/analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Báo cáo</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Phân tích chi tiết về hiệu suất CRM
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select className="select select-bordered select-sm">
              <option>30 ngày qua</option>
              <option>90 ngày qua</option>
              <option>6 tháng qua</option>
              <option>1 năm qua</option>
            </select>
            <button className="btn btn-outline btn-sm">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </button>
            <button className="btn btn-primary btn-sm">
              <Download className="w-4 h-4 mr-2" />
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChart 
            data={chartData.leadsByStatus} 
            title="Phân bố Leads theo trạng thái" 
          />
          <PieChart 
            data={chartData.leadsByRegion} 
            title="Phân bố Leads theo khu vực" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart 
            data={chartData.leadsByMonth} 
            title="Xu hướng Leads theo tháng" 
          />
          <LineChart 
            data={chartData.revenueByMonth} 
            title="Xu hướng doanh thu" 
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Sources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Nguồn Leads hiệu quả nhất
            </h3>
            <div className="space-y-3">
              {[
                { source: 'Website', leads: 45, percentage: 35, color: 'bg-blue-500' },
                { source: 'Social Media', leads: 32, percentage: 25, color: 'bg-green-500' },
                { source: 'Email Campaign', leads: 28, percentage: 22, color: 'bg-purple-500' },
                { source: 'Referral', leads: 15, percentage: 12, color: 'bg-yellow-500' },
                { source: 'Cold Call', leads: 8, percentage: 6, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.source}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.leads} leads
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Performers
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Nguyễn Văn A', deals: 15, revenue: 250000000, avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=6366f1&color=fff' },
                { name: 'Trần Thị B', deals: 12, revenue: 180000000, avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=10b981&color=fff' },
                { name: 'Lê Văn C', deals: 10, revenue: 150000000, avatar: 'https://ui-avatars.com/api/?name=Le+Van+C&background=f59e0b&color=fff' },
                { name: 'Phạm Thị D', deals: 8, revenue: 120000000, avatar: 'https://ui-avatars.com/api/?name=Pham+Thi+D&background=ef4444&color=fff' }
              ].map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      className="w-8 h-8 rounded-full" 
                      src={performer.avatar} 
                      alt={performer.name}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {performer.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {performer.deals} deals
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {(performer.revenue / 1000000).toFixed(0)}M VND
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forecasting */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dự báo AI
            </h3>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
              Powered by AI
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                15-20
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Leads dự kiến tuần tới
              </div>
              <div className="text-xs text-green-600 bg-green-100 rounded-full px-2 py-1">
                +12% so với tuần trước
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                85%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Khả năng đạt target tháng
              </div>
              <div className="text-xs text-green-600 bg-green-100 rounded-full px-2 py-1">
                Cao
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                450M
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Doanh thu dự kiến Q4
              </div>
              <div className="text-xs text-blue-600 bg-blue-100 rounded-full px-2 py-1">
                VND
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}