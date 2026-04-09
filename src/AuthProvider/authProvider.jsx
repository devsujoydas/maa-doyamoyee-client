import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 fetch user
  const fetchUser = async (token) => {
    try {
      if (!token) {
        setUser(null);
        return;
      }

      const { data } = await api.get("/users/profile");
    
      // 🔥 check response shape
      setUser(data.user || data);
    } catch (err) {
      console.error("User fetch failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }

    const handleAuthUpdate = () => {
      const token = localStorage.getItem("accessToken"); // ✅ FIX
      fetchUser(token);
    };

    window.addEventListener("authUpdated", handleAuthUpdate);

    return () => {
      window.removeEventListener("authUpdated", handleAuthUpdate);
    };
  }, []);

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      toast.success(res.message);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("accessToken");
    }
  };

  const value = {
    user,
    setUser,
    loading,
    logout,
    refreshUser: fetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);
