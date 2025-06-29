
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireHotelOwner?: boolean;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireHotelOwner, requireAdmin }: ProtectedRouteProps) => {
  const { user, session, profile } = useAuth();

  if (!user || !session) {
    return <Navigate to="/login" />;
  }

  // If requiring hotel owner access, check if user is hotel owner
  if (requireHotelOwner && !profile?.is_hotel_owner) {
    return <Navigate to="/user-dashboard" />;
  }

  // If requiring admin access, this will be handled by AdminRoute component
  // ProtectedRoute is mainly for general authentication and hotel owner checks

  return children;
};
