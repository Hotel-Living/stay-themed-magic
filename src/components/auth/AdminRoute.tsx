
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: JSX.Element;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, profile } = useAuth();

  if (!user || !profile?.is_admin) {
    return <Navigate to="/login" />;
  }

  return children;
};
