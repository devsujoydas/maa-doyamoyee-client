import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider/authProvider";

const AdminOnlyRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== "ceo") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default AdminOnlyRoutes;