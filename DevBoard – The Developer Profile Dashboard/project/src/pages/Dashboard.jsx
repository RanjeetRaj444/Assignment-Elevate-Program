import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import UserProfileCard from "../components/UserProfileCard";
import StatusUpdateForm from "../components/StatusUpdateForm";
import ThemeToggle from "../components/ThemeToogle";
import { AlertTriangle, Loader } from "lucide-react";

const Dashboard = () => {
  const { user, isAuthenticated, loading, error } = useAuth();

  // Log when dashboard is accessed
  useEffect(() => {
    console.log("Dashboard accessed at:", new Date().toISOString());
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader size={40} className="text-blue-500 animate-spin mb-4" />
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Loading your data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg shadow-md text-center">
        <AlertTriangle size={40} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
          Failed to load profile
        </h2>
        <p className="text-red-600 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg shadow-md text-center">
        <AlertTriangle size={40} className="text-yellow-500 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
          Authentication Required
        </h2>
        <p className="text-yellow-600 dark:text-yellow-300">
          Please login to see your dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Welcome back, {user.name.split(" ")[0]}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <UserProfileCard />
        </div>

        <div className="md:col-span-2">
          <StatusUpdateForm />
        </div>

        <div className="md:col-span-1">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
