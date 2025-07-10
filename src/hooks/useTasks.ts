import { useState, useEffect } from 'react';
import { Task, TaskFilter } from '../types/Task';
import { loadTasks, saveTasks } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');

  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (text: string): void => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>): void => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string): void => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string): void => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ));
  };

  const clearCompleted = (): void => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  return {
    tasks: filteredTasks,
    filter,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    setFilter
  };
};