import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
