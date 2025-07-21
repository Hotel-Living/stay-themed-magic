
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireHotelOwner?: boolean;
  requireAdmin?: boolean;
  requireAssociation?: boolean;
  requirePromoter?: boolean;
  requireTraveler?: boolean;
}

export const ProtectedRoute = ({ children, requireHotelOwner, requireAdmin, requireAssociation, requirePromoter, requireTraveler }: ProtectedRouteProps) => {
  const { user, session, profile, isLoading } = useAuth();

  console.log("=== PROTECTED ROUTE CHECK ===");
  console.log("Is loading:", isLoading);
  console.log("Has user:", !!user);
  console.log("Has session:", !!session);
  console.log("Require hotel owner:", requireHotelOwner);
  console.log("Require association:", requireAssociation);
  console.log("Require promoter:", requirePromoter);
  console.log("Require traveler:", requireTraveler);
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

  // Early detection and handling for special user types
  const isAssociationUser = user.user_metadata?.association_name;
  const isPromoterUser = user.user_metadata?.role === 'promoter';
  const isHotelOwnerUser = user.user_metadata?.is_hotel_owner;
  const isTravelerUser = !isAssociationUser && !isPromoterUser && !isHotelOwnerUser;
  const currentPath = window.location.pathname;
  
  // If user is association but not on association page, redirect immediately
  if (isAssociationUser && currentPath !== '/panel-asociacion' && !requireAssociation) {
    console.log("Association user detected on wrong page, redirecting to panel-asociacion");
    return <Navigate to="/panel-asociacion" replace />;
  }

  // If user is promoter but not on promoter page, redirect immediately  
  if (isPromoterUser && currentPath !== '/promoter/dashboard' && !requirePromoter) {
    console.log("Promoter user detected on wrong page, redirecting to promoter dashboard");
    return <Navigate to="/promoter/dashboard" replace />;
  }

  // If requiring association access, check if user has association_name in metadata
  if (requireAssociation && !isAssociationUser) {
    console.log("Association required but user has no association_name, redirecting to user dashboard");
    return <Navigate to="/user-dashboard" replace />;
  }

  // If requiring promoter access, check if user is promoter
  if (requirePromoter && !isPromoterUser) {
    console.log("Promoter required but user is not promoter, redirecting to user dashboard");
    return <Navigate to="/user-dashboard" replace />;
  }

  // If requiring traveler access, check if user is traveler (regular user)
  if (requireTraveler && !isTravelerUser) {
    console.log("Traveler required but user is not traveler, redirecting to appropriate dashboard");
    if (isAssociationUser) return <Navigate to="/panel-asociacion" replace />;
    if (isHotelOwnerUser) return <Navigate to="/hotel-dashboard" replace />;
    if (isPromoterUser) return <Navigate to="/promoter/dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  // If requiring hotel owner access, check if user is hotel owner (but not association)
  if (requireHotelOwner && !isHotelOwnerUser) {
    console.log("Hotel owner required but user is not hotel owner, redirecting to user dashboard");
    return <Navigate to="/user-dashboard" replace />;
  }

  // Prevent hotel owners from accessing association pages
  if (requireAssociation && isHotelOwnerUser && !isAssociationUser) {
    console.log("Hotel owner trying to access association page, redirecting to hotel dashboard");
    return <Navigate to="/hotel-dashboard" replace />;
  }

  // Prevent promoters from accessing other dashboards
  if ((requireAssociation || requireHotelOwner || requireTraveler) && isPromoterUser) {
    console.log("Promoter trying to access wrong dashboard, redirecting to promoter dashboard");
    return <Navigate to="/promoter/dashboard" replace />;
  }

  console.log("ProtectedRoute validation passed, rendering children");
  console.log("=== PROTECTED ROUTE CHECK END ===");
  return children;
};
