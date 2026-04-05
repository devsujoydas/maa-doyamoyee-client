import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/authProvider";

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoutes;