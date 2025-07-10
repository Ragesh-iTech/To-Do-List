import React, { useState } from 'react';
import { Check, Edit2, Trash2, X } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() && editText.trim() !== task.text) {
      onUpdate(task.id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl 
                     transition-all duration-300 p-4 border border-gray-100 hover:border-gray-200 
                     transform hover:-translate-y-1 ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 
                     flex items-center justify-center ${
            task.completed
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-500'
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {task.completed && <Check size={14} className="text-white" />}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="w-full px-3 py-2 text-lg bg-gray-50 border border-gray-200 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <span
              className={`text-lg cursor-pointer transition-all duration-200 ${
                task.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-800 hover:text-gray-600'
              }`}
              onClick={() => setIsEditing(true)}
            >
              {task.text}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg 
                           transition-all duration-200"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg 
                           transition-all duration-200"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg 
                           transition-all duration-200"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg 
                           transition-all duration-200"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};