import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Code, LogIn } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();
  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    setLoginAttempted(true);
    const success = await login();
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md transition-all duration-300">
        <div className="text-center">
          <Code size={50} className="mx-auto text-blue-600 dark:text-blue-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Welcome to DevBoard</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your personal developer dashboard
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn size={20} className="text-blue-300 group-hover:text-blue-200 transition" />
              </span>
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
            
            {loginAttempted && error && (
              <div className="text-red-500 text-center text-sm mt-2">
                {error}
              </div>
            )}
            
            <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>Demo purposes only - no actual credentials needed</p>
              <p className="mt-1">Click the login button to simulate authentication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;