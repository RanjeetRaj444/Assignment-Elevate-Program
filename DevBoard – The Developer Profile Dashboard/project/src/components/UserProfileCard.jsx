import React from "react";
import { Mail, Briefcase, MapPin } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const UserProfileCard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(user.email);
    // You could add a toast notification here
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
      <div className="px-6 py-4 sm:pb-6 relative">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 rounded-full p-1 shadow-lg">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Mail size={18} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {user.email}
              </span>
              <button
                onClick={copyEmail}
                className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Copy
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <Briefcase
                size={18}
                className="text-gray-500 dark:text-gray-400"
              />
              <span className="text-gray-700 dark:text-gray-300">
                {user.company.name}
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {user.company.bs}
                </span>
              </span>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <MapPin size={18} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">
                {user.address.city}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
