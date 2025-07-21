
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

export const ProtectedRoute = ({ 
  children, 
  requireHotelOwner, 
  requireAdmin, 
  requireAssociation, 
  requirePromoter, 
  requireTraveler 
}: ProtectedRouteProps) => {
  const { user, session, profile, isLoading } = useAuth();

  console.log("=== PROTECTED ROUTE CHECK ===");
  console.log("Is loading:", isLoading);
  console.log("Has user:", !!user);
  console.log("Has session:", !!session);
  console.log("Requirements:", { requireHotelOwner, requireAdmin, requireAssociation, requirePromoter, requireTraveler });
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

  // Extract user type information from metadata
  const isAssociationUser = user.user_metadata?.association_name;
  const isHotelOwner = user.user_metadata?.is_hotel_owner;
  const isPromoter = user.user_metadata?.role === 'promoter';
  const isTraveler = !isAssociationUser && !isHotelOwner && !isPromoter;

  const currentPath = window.location.pathname;
  
  console.log("User type analysis:", {
    isAssociationUser: !!isAssociationUser,
    isHotelOwner: !!isHotelOwner,
    isPromoter: !!isPromoter,
    isTraveler: !!isTraveler
  });

  // Early detection and routing for all user types to prevent flashing
  
  // Association users - highest priority
  if (isAssociationUser && currentPath !== '/panel-asociacion' && !requireAssociation) {
    console.log("Association user detected on wrong page, redirecting to panel-asociacion");
    return <Navigate to="/panel-asociacion" replace />;
  }

  // Hotel owners - second priority
  if (isHotelOwner && !isAssociationUser && currentPath !== '/hotel-dashboard' && !requireHotelOwner) {
    console.log("Hotel owner detected on wrong page, redirecting to hotel-dashboard");
    return <Navigate to="/hotel-dashboard" replace />;
  }

  // Promoters - third priority
  if (isPromoter && !isAssociationUser && !isHotelOwner && currentPath !== '/promoter/dashboard' && !requirePromoter) {
    console.log("Promoter detected on wrong page, redirecting to promoter/dashboard");
    return <Navigate to="/promoter/dashboard" replace />;
  }

  // Travelers - default for remaining authenticated users
  if (isTraveler && currentPath !== '/user-dashboard' && !requireTraveler) {
    console.log("Traveler detected on wrong page, redirecting to user-dashboard");
    return <Navigate to="/user-dashboard" replace />;
  }

  // Role-based access control validation
  
  // If requiring association access
  if (requireAssociation && !isAssociationUser) {
    console.log("Association required but user has no association_name, redirecting based on user type");
    if (isHotelOwner) return <Navigate to="/hotel-dashboard" replace />;
    if (isPromoter) return <Navigate to="/promoter/dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  // If requiring hotel owner access
  if (requireHotelOwner && !isHotelOwner) {
    console.log("Hotel owner required but user is not hotel owner, redirecting based on user type");
    if (isAssociationUser) return <Navigate to="/panel-asociacion" replace />;
    if (isPromoter) return <Navigate to="/promoter/dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  // If requiring promoter access
  if (requirePromoter && !isPromoter) {
    console.log("Promoter required but user is not promoter, redirecting based on user type");
    if (isAssociationUser) return <Navigate to="/panel-asociacion" replace />;
    if (isHotelOwner) return <Navigate to="/hotel-dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  // If requiring traveler access
  if (requireTraveler && !isTraveler) {
    console.log("Traveler required but user is not traveler, redirecting based on user type");
    if (isAssociationUser) return <Navigate to="/panel-asociacion" replace />;
    if (isHotelOwner) return <Navigate to="/hotel-dashboard" replace />;
    if (isPromoter) return <Navigate to="/promoter/dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  // Cross-role access prevention
  
  // Prevent non-association users from accessing association pages
  if (requireAssociation && (isHotelOwner || isPromoter || isTraveler)) {
    console.log("Non-association user trying to access association page, redirecting to appropriate dashboard");
    if (isHotelOwner) return <Navigate to="/hotel-dashboard" replace />;
    if (isPromoter) return <Navigate to="/promoter/dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  // Prevent non-hotel owners from accessing hotel pages
  if (requireHotelOwner && (isAssociationUser || isPromoter || isTraveler)) {
    console.log("Non-hotel owner trying to access hotel page, redirecting to appropriate dashboard");
    if (isAssociationUser) return <Navigate to="/panel-asociacion" replace />;
    if (isPromoter) return <Navigate to="/promoter/dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  // Prevent non-promoters from accessing promoter pages
  if (requirePromoter && (isAssociationUser || isHotelOwner || isTraveler)) {
    console.log("Non-promoter trying to access promoter page, redirecting to appropriate dashboard");
    if (isAssociationUser) return <Navigate to="/panel-asociacion" replace />;
    if (isHotelOwner) return <Navigate to="/hotel-dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  console.log("ProtectedRoute validation passed, rendering children");
  console.log("=== PROTECTED ROUTE CHECK END ===");
  return children;
};
