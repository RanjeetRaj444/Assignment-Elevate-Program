import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare } from 'lucide-react';

const StatusUpdateForm = () => {
  const { user, updateStatus } = useAuth();
  const [status, setStatus] = useState(user?.statusMessage || '');
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const inputRef = useRef(null);

  // Update status state when user changes
  useEffect(() => {
    if (user?.statusMessage) {
      setStatus(user.statusMessage);
    }
  }, [user]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (status.trim() === '') return;
    
    updateStatus(status);
    setIsEditing(false);
    
    // Show toast notification
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <MessageSquare size={20} className="mr-2 text-blue-500" />
          Developer Status
        </h3>
        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            Edit Status
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-2">
          <input
            ref={inputRef}
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="How are you feeling today?"
            maxLength={100}
          />
          <div className="flex justify-between mt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {status.length}/100 characters
            </span>
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
          <p className="text-gray-800 dark:text-gray-200 text-lg">
            {status || "No status set yet."}
          </p>
        </div>
      )}

      {/* Toast Notification */}
      <div 
        className={`fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md transition-opacity duration-300 ${
          showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex">
          <div className="py-1">
            <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Status Updated!</p>
            <p className="text-sm">Your developer status has been updated successfully.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateForm;