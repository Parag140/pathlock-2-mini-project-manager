import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import axiosInstance from '../api/axiosInstance';
import { Trash2, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onProjectDeleted: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onProjectDeleted }) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete project "${project.title}"?`)) {
      try {
        await axiosInstance.delete(`/projects/${project.id}`);
        onProjectDeleted();
      } catch (error) {
        console.error('Failed to delete project', error);
        alert('Failed to delete project.');
      }
    }
  };

  return (
    <div className="relative group bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-gray-700/40 backdrop-blur-lg p-6 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:-translate-y-2">
      {/* Subtle glow border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>

      {/* Project Title */}
      <h3 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
        <Link to={`/projects/${project.id}`} className="flex items-center gap-2 hover:scale-105 transition-transform">
          {project.title}
          <ArrowRight className="text-cyan-300 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </h3>

      {/* Description */}
      <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

      {/* Created Date */}
      <p className="text-xs text-gray-500 mb-4">
        Created on: {new Date(project.createdAt).toLocaleDateString()}
      </p>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
