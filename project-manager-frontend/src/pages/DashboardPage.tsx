import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { removeToken } from '../utils/auth';
import type { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<Project[]>('/projects');
      setProjects(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Failed to fetch projects.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = () => {
    fetchProjects();
  };

  const handleProjectDeleted = () => {
    fetchProjects();
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 p-6 bg-black/40 backdrop-blur-xl border-2 border-cyan-400/30 rounded-2xl shadow-2xl">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
              PROJECT DASHBOARD
            </h1>
            <p className="text-gray-400 font-mono text-sm mt-2">
              Active Projects: <span className="text-cyan-400">{projects.length}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 font-mono uppercase tracking-wider shadow-lg"
          >
            LOGOUT
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border-2 border-red-400/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-center text-red-400">
              <span className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-pulse"></span>
              {error}
            </div>
          </div>
        )}

        {/* Project Form */}
        <div className="mb-8 p-6 bg-black/40 backdrop-blur-xl border-2 border-purple-400/30 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-400 font-mono mb-4">CREATE NEW PROJECT</h2>
          <ProjectForm onProjectAdded={handleProjectAdded} />
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-cyan-400 font-mono text-lg">LOADING PROJECTS...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onProjectDeleted={handleProjectDeleted} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-20 bg-black/40 backdrop-blur-xl border-2 border-cyan-400/30 rounded-2xl shadow-2xl">
            <div className="text-6xl mb-4 opacity-50">🚀</div>
            <h3 className="text-2xl font-bold text-cyan-400 font-mono mb-2">NO PROJECTS FOUND</h3>
            <p className="text-gray-400">Create your first project to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;