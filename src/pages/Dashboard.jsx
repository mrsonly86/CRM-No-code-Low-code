import React from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Target,
  UserPlus,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import Layout from '../components/Layout/Layout';
import MetricCard from '../components/Dashboard/MetricCard';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import LineChart from '../components/Charts/LineChart';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { 
  dashboardMetrics, 
  chartData, 
  aiInsights,
  mockLeads,
  LEAD_STATUSES 
} from '../data/mockData';
import { useLeadsStore } from '../store/leadsStore';

export default function Dashboard() {
  const { getLeadStats } = useLeadsStore();
  const stats = getLeadStats();

  const metrics = [
    {
      title: 'Tổng giá trị',
      value: dashboardMetrics.totalValue,
      change: 12.8,
      changeType: 'positive',
      icon: DollarSign,
      isCurrency: true
    },
    {
      title: 'Tổng leads',
      value: stats.total,
      change: 8.2,
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Tỷ lệ chuyển đổi',
      value: stats.conversionRate,
      change: 2.1,
      changeType: 'positive',
      icon: Target,
      suffix: '%'
    },
    {
      title: 'Deals đang xử lý',
      value: stats.WORKING + stats.QUALIFIED,
      change: 5.4,
      changeType: 'positive',
      icon: TrendingUp
    }
  ];

  return (
    <Layout currentPath="/">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Chào mừng trở lại! 👋</h1>
          <p className="text-primary-light">
            Đây là tổng quan về hiệu suất CRM của bạn hôm nay
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChart 
            data={chartData.leadsByStatus} 
            title="Phân bố Leads theo trạng thái" 
          />
          <BarChart 
            data={chartData.leadsByMonth} 
            title="Leads theo tháng" 
          />
        </div>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LineChart 
              data={chartData.revenueByMonth} 
              title="Xu hướng doanh thu" 
            />
          </div>
          <RecentActivity />
        </div>

        {/* AI Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Insights & Gợi ý
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiInsights.map((insight) => {
                const getPriorityColor = (priority) => {
                  switch (priority) {
                    case 'high': return 'border-red-200 bg-red-50 dark:bg-red-900/20';
                    case 'medium': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20';
                    case 'low': return 'border-green-200 bg-green-50 dark:bg-green-900/20';
                    default: return 'border-gray-200 bg-gray-50 dark:bg-gray-700';
                  }
                };

                const getIcon = (type) => {
                  switch (type) {
                    case 'prediction': return <Target className="w-5 h-5 text-blue-600" />;
                    case 'opportunity': return <UserPlus className="w-5 h-5 text-green-600" />;
                    case 'risk': return <AlertTriangle className="w-5 h-5 text-red-600" />;
                    case 'optimization': return <CheckCircle className="w-5 h-5 text-purple-600" />;
                    default: return <TrendingUp className="w-5 h-5 text-gray-600" />;
                  }
                };

                return (
                  <div 
                    key={insight.id} 
                    className={`p-4 rounded-lg border ${getPriorityColor(insight.priority)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {getIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {insight.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <button className="text-xs text-primary hover:text-primary-dark font-medium">
                            {insight.action}
                          </button>
                          <span className="text-xs text-gray-500">
                            {insight.confidence}% tin cậy
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Hành động nhanh
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <UserPlus className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Thêm Lead</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Calendar className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Lịch hẹn</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Báo cáo</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <CheckCircle className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Theo dõi</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}