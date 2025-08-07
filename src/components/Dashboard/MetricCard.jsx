import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon, 
  className = "",
  isCurrency = false,
  suffix = ""
}) {
  const { getFormattedCurrency } = useSettingsStore();

  const formatValue = (val) => {
    if (isCurrency) {
      return getFormattedCurrency(val);
    }
    
    if (typeof val === 'number' && val >= 1000) {
      if (val >= 1000000000) {
        return `${(val / 1000000000).toFixed(1)}B`;
      } else if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
    }
    
    return val?.toLocaleString('vi-VN') + suffix;
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') {
      return <ArrowUpRight className="w-4 h-4" />;
    } else if (changeType === 'negative') {
      return <ArrowDownRight className="w-4 h-4" />;
    }
    return <TrendingUp className="w-4 h-4" />;
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className={`metric-card ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getChangeColor()}`}>
                {getChangeIcon()}
                <span className="ml-1">
                  {Math.abs(change).toFixed(1)}%
                </span>
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                so với tháng trước
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}