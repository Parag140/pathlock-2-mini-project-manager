import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import type { Project, TaskItem } from '../types';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard.tsx';

interface ProjectDetails extends Project {
  tasks: TaskItem[];
}

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjectDetails = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<ProjectDetails>(`/projects/${id}`);
      setProject(response.data);
      setError(null);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Project not found.");
      } else {
        setError(err.response?.data?.Message || 'Failed to fetch project details.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const handleTaskAdded = () => {
    fetchProjectDetails();
  };

  const handleTaskUpdated = () => {
    fetchProjectDetails();
  };

  const handleTaskDeleted = () => {
    fetchProjectDetails();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center p-8 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-600 max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-slate-300 mb-6">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading project...</p>
        </div>
      </div>
    );
  }

  const completedTasks = project.tasks.filter(task => task.isCompleted).length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600">
          <div className="flex-1">
            <button
              onClick={() => navigate('/dashboard')}
              className="mb-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              ← Back
            </button>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-slate-300 mt-2 text-lg">{project.description}</p>
            <div className="flex items-center gap-4 mt-4 text-slate-400 text-sm">
              <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {totalTasks} tasks
              </span>
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600 p-6 text-center">
            <div className="text-2xl font-bold text-blue-400">{totalTasks}</div>
            <div className="text-slate-400 text-sm mt-1">Total Tasks</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600 p-6 text-center">
            <div className="text-2xl font-bold text-green-400">{completedTasks}</div>
            <div className="text-slate-400 text-sm mt-1">Completed</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600 p-6 text-center">
            <div className="text-2xl font-bold text-purple-400">{Math.round(progress)}%</div>
            <div className="text-slate-400 text-sm mt-1">Progress</div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalTasks > 0 && (
          <div className="mb-8 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-300 font-semibold">Project Progress</span>
              <span className="text-slate-400 text-sm">{completedTasks}/{totalTasks}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Add Task Form */}
        <div className="mb-8 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600">
          <h2 className="text-2xl font-bold text-white mb-4">Add New Task</h2>
          <TaskForm projectId={project.id} onTaskAdded={handleTaskAdded} />
        </div>

        {/* Tasks Section */}
        <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Tasks</h2>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
              {totalTasks} tasks
            </span>
          </div>

          {project.tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No tasks yet</h3>
              <p className="text-slate-400">Add your first task to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onTaskUpdated={handleTaskUpdated}
                  onTaskDeleted={handleTaskDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;