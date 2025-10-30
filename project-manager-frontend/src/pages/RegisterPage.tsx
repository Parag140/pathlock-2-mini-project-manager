import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      await axiosInstance.post('/auth/register', { username, password });
      setSuccess('Registration successful! You can now log in.');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.Message || 'Registration failed. Please try again.');
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
                CREATE ACCOUNT
              </h2>
              <div className="w-3 h-3 bg-purple-400 rounded-full ml-2 animate-pulse delay-500"></div>
            </div>
            <p className="text-gray-400 text-center text-sm font-mono tracking-widest">JOIN THE NETWORK</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="flex items-center text-cyan-300 text-sm font-mono uppercase tracking-wider">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                USERNAME
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
                PASSWORD
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="flex items-center text-cyan-300 text-sm font-mono uppercase tracking-wider">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse delay-500"></span>
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-black/50 border-2 border-blue-400/30 rounded-lg text-white font-mono placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  placeholder="••••••••"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000"></div>
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

            {success && (
              <div className="p-3 bg-green-500/10 border-2 border-green-400/50 rounded-lg">
                <div className="flex items-center text-green-400 text-sm font-mono">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  {success}
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
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <span className="mr-2">⏣</span>
                    INITIATE REGISTRATION
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t-2 border-cyan-400/20">
              <Link 
                to="/login" 
                className="inline-flex items-center text-cyan-300 hover:text-cyan-200 font-mono text-sm transition-all duration-300 group"
              >
                <span className="mr-2">↩</span>
                EXISTING USER? ACCESS SYSTEM
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </form>

          {/* Footer Decoration */}
          <div className="px-8 py-4 bg-black/60 border-t-2 border-cyan-400/20">
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
              <span>SYSTEM_READY</span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* Binary Rain Effect */}
        <div className="absolute -z-10 inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-cyan-400 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `binaryRain ${10 + Math.random() * 10}s linear ${Math.random() * 5}s infinite`,
                top: '-20px'
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>

      {/* Binary Rain Animation using Tailwind */}
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
        `}
      </style>
    </div>
  );
};

export default RegisterPage;