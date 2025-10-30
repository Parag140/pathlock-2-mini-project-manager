import React, { useState } from 'react';
import type { TaskItem } from '../types';
import axiosInstance from '../api/axiosInstance';

interface TaskCardProps {
  task: TaskItem;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(task.title);
  const [editedDueDate, setEditedDueDate] = useState<string>(task.dueDate.split('T')[0]);
  const [editedIsCompleted, setEditedIsCompleted] = useState<boolean>(task.isCompleted);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdate = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await axiosInstance.put(`/tasks/${task.id}`, {
        title: editedTitle,
        dueDate: new Date(editedDueDate).toISOString(),
        isCompleted: editedIsCompleted,
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Failed to update task.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleCompletion = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await axiosInstance.put(`/tasks/${task.id}`, {
        title: task.title,
        dueDate: task.dueDate,
        isCompleted: !task.isCompleted,
      });
      onTaskUpdated();
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Failed to toggle task completion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      setIsLoading(true);
      try {
        await axiosInstance.delete(`/tasks/${task.id}`);
        onTaskDeleted();
      } catch (error) {
        console.error("Failed to delete task", error);
        alert("Failed to delete task.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isOverdue = !task.isCompleted && new Date(task.dueDate) < new Date();
  const dueDate = new Date(task.dueDate);
  const isToday = dueDate.toDateString() === new Date().toDateString();
  const isTomorrow = new Date(dueDate.getTime() - 24 * 60 * 60 * 1000).toDateString() === new Date().toDateString();

  const getStatusColor = () => {
    if (task.isCompleted) return 'from-green-500 to-emerald-500';
    if (isOverdue) return 'from-red-500 to-pink-500';
    if (isToday) return 'from-orange-500 to-red-500';
    if (isTomorrow) return 'from-yellow-500 to-orange-500';
    return 'from-blue-500 to-cyan-500';
  };

  const getStatusText = () => {
    if (task.isCompleted) return 'COMPLETED';
    if (isOverdue) return 'OVERDUE';
    if (isToday) return 'DUE TODAY';
    if (isTomorrow) return 'DUE TOMORROW';
    return 'PENDING';
  };

  const getDueDateText = () => {
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    return dueDate.toLocaleDateString();
  };

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border-2 ${task.isCompleted ? 'border-green-400/30' : isOverdue ? 'border-red-400/30' : 'border-gray-600/50'} rounded-2xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 group`}>
      
      {/* Status Badge */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r ${getStatusColor()} mb-4`}>
        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
        {getStatusText()}
      </div>

      {isEditing ? (
        // Edit Mode
        <div className="space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
            placeholder="Task title..."
            disabled={isLoading}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
            disabled={isLoading}
          />
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="checkbox"
                id={`task-completed-${task.id}`}
                checked={editedIsCompleted}
                onChange={(e) => setEditedIsCompleted(e.target.checked)}
                className="w-5 h-5 text-cyan-400 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                disabled={isLoading}
              />
            </div>
            <label htmlFor={`task-completed-${task.id}`} className="text-gray-300 text-sm font-medium">
              Mark as completed
            </label>
          </div>
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-400/30 rounded-lg">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isLoading || !editedTitle.trim()}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <>
          <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors duration-200 ${task.isCompleted ? 'line-through opacity-70' : ''}`}>
            {task.title}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-300 mb-4">
            <span className="text-lg">📅</span>
            <span className="font-medium">{getDueDateText()}</span>
            {!isToday && !isTomorrow && (
              <span className="text-gray-500 text-sm">({dueDate.toLocaleDateString()})</span>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-600/50">
            <button
              onClick={handleToggleCompletion}
              disabled={isLoading}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                task.isCompleted 
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-500/30' 
                  : 'bg-green-500/20 text-green-400 border border-green-400/30 hover:bg-green-500/30'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : task.isCompleted ? (
                '↶ Reopen'
              ) : (
                '✓ Complete'
              )}
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="p-2 bg-blue-500/20 text-blue-400 border border-blue-400/30 rounded-xl hover:bg-blue-500/30 transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Edit task"
              >
                ✏️
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="p-2 bg-red-500/20 text-red-400 border border-red-400/30 rounded-xl hover:bg-red-500/30 transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;