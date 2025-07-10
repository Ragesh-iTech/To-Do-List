import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="w-full px-6 py-4 text-lg bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl 
                   shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   transition-all duration-200 hover:shadow-xl pr-16"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 
                   text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 
                   flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105"
      >
        <Plus size={20} />
      </button>
    </form>
  );
};