import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true);

  // Fetch user data on initial load
 
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/users/me"); // Adjust endpoint as needed
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

   

  const login = async (credentials) => {
    try {
      await axiosInstance.post("/users/login", credentials); // Adjust endpoint as needed
      await fetchUser(); // Fetch the user data again
      console.log("Logged in successfully");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/users/logout", {}, { withCredentials: true });
      setUser(null); // Clear user data
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      setUser(null); // Still log out client-side even if server fails
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);