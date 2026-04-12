 
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/authProvider";

const AdminPrivateRoutes = ({children}) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user || !["admin", "ceo"].includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default AdminPrivateRoutes;
