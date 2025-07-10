import React from 'react';
import { CheckCircle, Clock, ListTodo } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-xl">
            <ListTodo className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 rounded-xl">
            <Clock className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Active Tasks</p>
            <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-xl">
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
          </div>
        </div>
      </div>

      {stats.total > 0 && (
        <div className="md:col-span-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-bold text-gray-800">{completionRate.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};