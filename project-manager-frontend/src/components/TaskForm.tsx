import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { CalendarDays, PlusCircle } from "lucide-react";

interface TaskFormProps {
  projectId: number;
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await axiosInstance.post(`/projects/${projectId}/tasks`, {
        title,
        dueDate: dueDate
          ? new Date(dueDate).toISOString()
          : new Date().toISOString(),
        isCompleted: false,
      });
      setTitle("");
      setDueDate("");
      onTaskAdded();
    } catch (err: any) {
      setError(err.response?.data?.Message || "Failed to add task.");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.1)] transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] mb-8 max-w-xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-2xl pointer-events-none"></div>

      <h3 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
        <PlusCircle className="inline-block mr-2 mb-1 text-cyan-400" size={22} />
        Add New Task
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Title Input */}
        <div>
          <label
            htmlFor="taskTitle"
            className="block text-sm font-semibold text-cyan-300 mb-2 tracking-wide"
          >
            Task Title
          </label>
          <input
            type="text"
            id="taskTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900/50 text-white border border-cyan-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all placeholder-gray-400"
            placeholder="Enter task name..."
          />
        </div>

        {/* Due Date Input */}
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-semibold text-cyan-300 mb-2 tracking-wide"
          >
            Due Date
          </label>
          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-3 top-3 text-cyan-400"
            />
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900/50 text-white border border-cyan-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm italic border-l-2 border-red-500 pl-2">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-lg tracking-wide text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-500 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] focus:ring-4 focus:ring-cyan-400/50"
        >
          + Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
