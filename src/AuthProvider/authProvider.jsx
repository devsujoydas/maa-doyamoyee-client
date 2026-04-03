import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api"; // jeita tumi age interceptor setup korecho

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch logged-in user profile
  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users/profile");
      setUser(data.user || null);
      console.log(data)
      setError(null);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // run once on mount
  useEffect(() => {
    fetchUser();
  }, []);

  // login function (optional)
  const login = async (credentials) => {
    try {
      const { data } = await api.post("/auth/login", credentials, { withCredentials: true });
      localStorage.setItem("accessToken", data.accessToken);
      await fetchUser();
      return data;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        refreshUser: fetchUser, // manually refresh user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};