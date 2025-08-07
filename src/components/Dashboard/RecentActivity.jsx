import React from 'react';
import { Clock, TrendingUp, UserCheck, Trophy, Mail } from 'lucide-react';
import { recentActivities } from '../../data/mockData';

const iconMap = {
  'user-plus': UserCheck,
  'check-circle': TrendingUp,
  'calendar': Clock,
  'trophy': Trophy,
  'mail': Mail
};

export default function RecentActivity({ className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Hoạt động gần đây
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = iconMap[activity.icon] || Clock;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <button className="w-full text-center text-sm text-primary hover:text-primary-dark font-medium">
            Xem tất cả hoạt động
          </button>
        </div>
      </div>
    </div>
  );
}