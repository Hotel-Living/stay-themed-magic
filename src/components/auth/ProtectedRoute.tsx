
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
  const { user, session, profile, isLoading, isRedirecting } = useAuth();

  console.log("=== PROTECTED ROUTE CHECK ===");
  console.log("Is loading:", isLoading);
  console.log("Is redirecting:", isRedirecting);
  console.log("Has user:", !!user);
  console.log("Has session:", !!session);
  console.log("Require hotel owner:", requireHotelOwner);
  console.log("Require association:", requireAssociation);
  console.log("Require promoter:", requirePromoter);
  console.log("Require traveler:", requireTraveler);
  console.log("User metadata:", user?.user_metadata);
  console.log("Profile data:", profile);
  console.log("Current path:", window.location.pathname);

  // CRITICAL: Block all rendering while redirecting - this eliminates the flash completely
  if (isRedirecting) {
    console.log("Redirect in progress, blocking all rendering to eliminate flash");
    return null; // Render absolutely nothing during redirect
  }

  // Show loading while auth state is being determined
  if (isLoading) {
    console.log("Auth still loading, showing loading state");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If no user or session, redirect to register-role page
  if (!user || !session) {
    console.log("No user or session, redirecting to register-role");
    return <Navigate to="/register-role" replace />;
  }

  // CRITICAL: If user exists but profile is still null/undefined, continue loading
  // This prevents the flash of user-dashboard while profile data loads
  if (user && !profile) {
    console.log("User exists but profile not loaded yet, continuing loading state");
    return null; // Render nothing to completely eliminate any flash
  }

  // CRITICAL: Also prevent rendering during the brief moment when profile exists 
  // but role-based redirects are still processing. This eliminates the flash completely.
  if (user && profile) {
    const userRole = profile?.role || 
                     (user.user_metadata?.is_hotel_owner ? 'hotel_owner' : 
                      user.user_metadata?.association_name ? 'association' : 
                      user.user_metadata?.role === 'promoter' ? 'promoter' : 'guest');
    
    const currentPath = window.location.pathname;
    const isAssociationUser = userRole === 'association';
    const isPromoterUser = userRole === 'promoter';
    const isHotelOwnerUser = userRole === 'hotel_owner';
    const isTravelerUser = userRole === 'guest';
    
    // CRITICAL: If user has any assigned role but is still on /register-role, prevent rendering
    // This eliminates the flash that shows user dashboard before redirecting away from role selection
    if (currentPath === '/register-role' && (isAssociationUser || isPromoterUser || isHotelOwnerUser || isTravelerUser)) {
      console.log(`User with role ${userRole} still on register-role page, preventing render until redirect`);
      return null; // Render nothing to eliminate flash
    }
    
    // If user has a role but is on the wrong dashboard path, render nothing until redirect completes
    if ((isAssociationUser && currentPath !== '/panel-asociacion' && currentPath !== '/register-role') ||
        (isPromoterUser && currentPath !== '/promoter/dashboard' && currentPath !== '/register-role') ||
        (isHotelOwnerUser && currentPath !== '/panel-hotel' && currentPath !== '/hotel-dashboard' && currentPath !== '/register-role')) {
      console.log("User has role but is on wrong path, preventing render until redirect");
      return null; // Render nothing to eliminate flash
    }
  }

  // Early detection and handling for special user types - prioritize profile role over metadata
  const userRole = profile?.role || 
                   (user.user_metadata?.is_hotel_owner ? 'hotel_owner' : 
                    user.user_metadata?.association_name ? 'association' : 
                    user.user_metadata?.role === 'promoter' ? 'promoter' : 'guest');
  
  // CRITICAL: If user has no role assigned (null/undefined/empty), redirect to role selection immediately
  // This prevents brief rendering of any dashboard before redirect
  // Note: 'guest' is a valid role, so don't redirect guest users
  const hasNoRole = !userRole || userRole === '' || userRole === null || userRole === undefined;
  
  if (hasNoRole) {
    console.log("User has no role assigned, redirecting to register-role immediately");
    return <Navigate to="/register-role" replace />;
  }

  const isAssociationUser = userRole === 'association';
  const isPromoterUser = userRole === 'promoter';
  const isHotelOwnerUser = userRole === 'hotel_owner';
  const isTravelerUser = userRole === 'guest';
  const currentPath = window.location.pathname;
  
  console.log("Detected user role:", userRole);
  console.log("Role flags:", { isAssociationUser, isPromoterUser, isHotelOwnerUser, isTravelerUser });
  
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
    if (isHotelOwnerUser) return <Navigate to="/panel-hotel" replace />;
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
    console.log("Hotel owner trying to access association page, redirecting to panel-hotel");
    return <Navigate to="/panel-hotel" replace />;
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
