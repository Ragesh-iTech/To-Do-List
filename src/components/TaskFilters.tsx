import React from 'react';
import { TaskFilter } from '../types/Task';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  currentFilter,
  onFilterChange,
  stats,
  onClearCompleted
}) => {
  const filters: { key: TaskFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
      <div className="flex items-center space-x-2">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              currentFilter === filter.key
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
            <span className="ml-1 text-sm opacity-75">({filter.count})</span>
          </button>
        ))}
      </div>
      
      {stats.completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 
                     bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
};