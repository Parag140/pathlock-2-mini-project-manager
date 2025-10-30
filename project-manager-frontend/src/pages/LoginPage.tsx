import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)'
        }}
      ></div>

      <div className="relative w-full max-w-md mx-4">
        {/* Main Card */}
        <div className="bg-black/40 backdrop-blur-2xl border-2 border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden 
          [box-shadow:0_0_20px_rgba(34,211,238,0.3),0_0_40px_rgba(34,211,238,0.2),0_0_60px_rgba(34,211,238,0.1),inset_0_0_20px_rgba(34,211,238,0.1)]">
          
          {/* Header */}
          <div className="relative p-8 border-b-2 border-cyan-400/20">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-mono">
                SYSTEM ACCESS
              </h2>
              <div className="w-3 h-3 bg-purple-400 rounded-full ml-2 animate-pulse delay-500"></div>
            </div>
            <p className="text-gray-400 text-center text-sm font-mono tracking-widest">AUTHENTICATION REQUIRED</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="flex items-center text-cyan-300 text-sm font-mono uppercase tracking-wider">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                USER IDENTIFICATION
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/50 border-2 border-cyan-400/30 rounded-lg text-white font-mono placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                  placeholder="ENTER_USERNAME"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="flex items-center text-cyan-300 text-sm font-mono uppercase tracking-wider">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse delay-300"></span>
                ACCESS CODE
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/50 border-2 border-purple-400/30 rounded-lg text-white font-mono placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all duration-300"
                  placeholder="••••••••"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-700"></div>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="p-3 bg-red-500/10 border-2 border-red-400/50 rounded-lg">
                <div className="flex items-center text-red-400 text-sm font-mono">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                  {error}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold font-mono uppercase tracking-wider rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <div className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🔒</span>
                    INITIATE LOGIN
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            {/* Register Link */}
            <div className="text-center pt-4 border-t-2 border-cyan-400/20">
              <Link 
                to="/register" 
                className="inline-flex items-center text-cyan-300 hover:text-cyan-200 font-mono text-sm transition-all duration-300 group"
              >
                <span className="mr-2">🚀</span>
                NEW USER? REQUEST ACCESS
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </form>

          {/* Security Status */}
          <div className="px-8 py-4 bg-black/60 border-t-2 border-cyan-400/20">
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                ENCRYPTION: ACTIVE
              </span>
              <span className="text-cyan-400">SECURE CONNECTION</span>
            </div>
          </div>
        </div>

        {/* Binary Matrix Effect */}
        <div className="absolute -z-10 inset-0 overflow-hidden opacity-20">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute text-cyan-400 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `binaryRain ${8 + Math.random() * 8}s linear ${Math.random() * 3}s infinite`,
                top: '-20px'
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>

        {/* Scan Line Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes binaryRain {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
          @keyframes scan {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(100vh);
            }
          }
          .animate-scan {
            animation: scan 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;