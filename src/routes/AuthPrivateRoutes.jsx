import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/authProvider";

const AuthPrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // 🔒 যদি user logged in থাকে → redirect
  if (user) {
    return <Navigate to="/" replace />;
  }

  // ✅ না থাকলে → allow
  return children;
};

export default AuthPrivateRoutes;