import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/authProvider";

const AdminPrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  // Optional: Loading state handle
  if (loading) return <div>Loading...</div>;

  // Not logged in or not admin → redirect
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin user → allow access
  return children;
};

export default AdminPrivateRoutes;