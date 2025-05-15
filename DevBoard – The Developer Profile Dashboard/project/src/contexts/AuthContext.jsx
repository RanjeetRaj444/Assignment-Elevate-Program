import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("devboard_auth");
    const storedUser = localStorage.getItem("devboard_user");

    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/6"
      );
      const userData = response.data;

      // Add default status message to user data
      userData.statusMessage = "Ready to code! 💻";

      setUser(userData);
      setIsAuthenticated(true);

      // Store auth state in localStorage
      localStorage.setItem("devboard_auth", "true");
      localStorage.setItem("devboard_user", JSON.stringify(userData));

      setLoading(false);
      return true;
    } catch (err) {
      setError("Failed to log in. Please try again.");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    // Remove auth state from localStorage
    localStorage.removeItem("devboard_auth");
    localStorage.removeItem("devboard_user");
  };

  const updateStatus = (newStatus) => {
    if (user) {
      const updatedUser = { ...user, statusMessage: newStatus };
      setUser(updatedUser);
      localStorage.setItem("devboard_user", JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    error,
    updateStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
