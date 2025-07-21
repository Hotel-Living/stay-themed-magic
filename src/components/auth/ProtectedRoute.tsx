
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireHotelOwner?: boolean;
  requireAdmin?: boolean;
  requireAssociation?: boolean;
}

export const ProtectedRoute = ({ children, requireHotelOwner, requireAdmin, requireAssociation }: ProtectedRouteProps) => {
  const { user, session, profile, isLoading } = useAuth();

  console.log("=== PROTECTED ROUTE CHECK ===");
  console.log("Is loading:", isLoading);
  console.log("Has user:", !!user);
  console.log("Has session:", !!session);
  console.log("Require hotel owner:", requireHotelOwner);
  console.log("Require association:", requireAssociation);
  console.log("User metadata:", user?.user_metadata);
  console.log("Current path:", window.location.pathname);

  // Show loading while auth state is being determined
  if (isLoading) {
    console.log("Auth still loading, showing loading state");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If no user or session, redirect to login
  if (!user || !session) {
    console.log("No user or session, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Early detection and handling for association users
  const isAssociationUser = user.user_metadata?.association_name;
  const currentPath = window.location.pathname;
  
  // If user is association but not on association page, redirect immediately
  if (isAssociationUser && currentPath !== '/panel-asociacion' && !requireAssociation) {
    console.log("Association user detected on wrong page, redirecting to panel-asociacion");
    return <Navigate to="/panel-asociacion" replace />;
  }

  // If requiring association access, check if user has association_name in metadata
  if (requireAssociation && !isAssociationUser) {
    console.log("Association required but user has no association_name, redirecting to user dashboard");
    return <Navigate to="/user-dashboard" replace />;
  }

  // If requiring hotel owner access, check if user is hotel owner (but not association)
  if (requireHotelOwner && !user.user_metadata?.is_hotel_owner) {
    console.log("Hotel owner required but user is not hotel owner, redirecting to user dashboard");
    return <Navigate to="/user-dashboard" replace />;
  }

  // Prevent hotel owners from accessing association pages
  if (requireAssociation && user.user_metadata?.is_hotel_owner && !isAssociationUser) {
    console.log("Hotel owner trying to access association page, redirecting to hotel dashboard");
    return <Navigate to="/hotel-dashboard" replace />;
  }

  console.log("ProtectedRoute validation passed, rendering children");
  console.log("=== PROTECTED ROUTE CHECK END ===");
  return children;
};
