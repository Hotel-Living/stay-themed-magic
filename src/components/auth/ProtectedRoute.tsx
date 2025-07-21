
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireHotelOwner?: boolean;
  requireAdmin?: boolean;
  requireAssociation?: boolean;
}

export const ProtectedRoute = ({ children, requireHotelOwner, requireAdmin, requireAssociation }: ProtectedRouteProps) => {
  const { user, session, profile } = useAuth();

  console.log("ProtectedRoute validation:", {
    hasUser: !!user,
    hasSession: !!session,
    requireHotelOwner,
    requireAssociation,
    userMetadata: user?.user_metadata
  });

  if (!user || !session) {
    console.log("No user or session, redirecting to login");
    return <Navigate to="/login" />;
  }

  // If requiring hotel owner access, check if user is hotel owner
  if (requireHotelOwner && !user.user_metadata?.is_hotel_owner) {
    console.log("Hotel owner required but user is not hotel owner, redirecting to user dashboard");
    return <Navigate to="/user-dashboard" />;
  }

  // If requiring association access, check if user has association_name in metadata
  if (requireAssociation && !user.user_metadata?.association_name) {
    console.log("Association required but user has no association_name, redirecting to user dashboard");
    return <Navigate to="/user-dashboard" />;
  }

  // If requiring admin access, this will be handled by AdminRoute component
  // ProtectedRoute is mainly for general authentication and hotel owner checks

  console.log("ProtectedRoute validation passed, rendering children");
  return children;
};
