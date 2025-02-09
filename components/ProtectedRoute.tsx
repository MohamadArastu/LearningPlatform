import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "admin" | "user"; // Optional role-based protection
}

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
