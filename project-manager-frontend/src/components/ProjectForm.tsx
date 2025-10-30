import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

interface ProjectFormProps {
  onProjectAdded: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onProjectAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await axiosInstance.post('/projects', { title, description });
      setTitle('');
      setDescription('');
      onProjectAdded();
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Failed to create project.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <h3 className="text-2xl font-bold text-white">Create New Project</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="projectTitle" className="block text-gray-300 text-sm font-semibold uppercase tracking-wide">
            Project Title
          </label>
          <input
            type="text"
            id="projectTitle"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project name..."
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="projectDescription" className="block text-gray-300 text-sm font-semibold uppercase tracking-wide">
            Description
          </label>
          <textarea
            id="projectDescription"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 resize-none"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project..."
            disabled={isLoading}
          ></textarea>
        </div>
        
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-400/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Project...
            </>
          ) : (
            <>
              <span>🚀</span>
              Create Project
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;