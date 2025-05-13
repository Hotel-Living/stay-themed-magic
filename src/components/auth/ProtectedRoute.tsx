
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireHotelOwner?: boolean;
}

export const ProtectedRoute = ({ children, requireHotelOwner }: ProtectedRouteProps) => {
  const { user, session, profile } = useAuth();

  if (!user || !session) {
    return <Navigate to="/login" />;
  }

  if (requireHotelOwner && profile?.is_hotel_owner === false) {
    return <Navigate to="/user-dashboard" />;
  }

  return children;
};
