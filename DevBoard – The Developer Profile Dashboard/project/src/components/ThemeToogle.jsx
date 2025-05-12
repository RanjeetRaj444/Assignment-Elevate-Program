import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme Preferences</h3>
      <div className="flex justify-between items-center">
        <span className="text-gray-700 dark:text-gray-300">
          Current theme: 
          <span className="ml-2 font-medium capitalize">
            {theme === 'light' ? (
              <span className="text-amber-600">Light Mode</span>
            ) : (
              <span className="text-indigo-400">Dark Mode</span>
            )}
          </span>
        </span>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            theme === 'light'
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
          }`}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon size={20} className="transition-transform hover:rotate-12" />
          ) : (
            <Sun size={20} className="transition-transform hover:rotate-12" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;