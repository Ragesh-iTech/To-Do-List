import React from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskInput } from './components/TaskInput';
import { TaskFilters } from './components/TaskFilters';
import { TaskItem } from './components/TaskItem';
import { TaskStats } from './components/TaskStats';
import { CheckSquare } from 'lucide-react';

function App() {
  const {
    tasks,
    filter,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    setFilter
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <CheckSquare className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize your tasks with style and efficiency
          </p>
        </div>

        {/* Task Input */}
        <div className="mb-8">
          <TaskInput onAddTask={addTask} />
        </div>

        {/* Task Stats */}
        <TaskStats stats={stats} />

        {/* Task Filters */}
        <div className="mb-6">
          <TaskFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
            onClearCompleted={clearCompleted}
          />
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg inline-block">
                <CheckSquare className="text-gray-400 mx-auto mb-4" size={48} />
                <p className="text-gray-500 text-lg">
                  {filter === 'active' 
                    ? 'No active tasks! Time to relax 🎉'
                    : filter === 'completed'
                    ? 'No completed tasks yet. Keep going! 💪'
                    : 'No tasks yet. Add one above to get started! ✨'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;