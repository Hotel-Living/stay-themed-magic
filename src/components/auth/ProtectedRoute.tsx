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

  // Show loading while auth state is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If no user or session, redirect to entrance
  if (!user || !session) {
    return <Navigate to="/entrance" replace />;
  }

  // If user exists but profile is not loaded yet, show loading
  if (user && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  // Admin check
  if (requireAdmin && profile?.role !== 'admin') {
    return <Navigate to="/user-dashboard" replace />;
  }

  // Hotel owner check
  if (requireHotelOwner && profile?.role !== 'hotel_owner') {
    return <Navigate to="/user-dashboard" replace />;
  }

  // Association check
  if (requireAssociation && profile?.role !== 'association') {
    return <Navigate to="/user-dashboard" replace />;
  }

  // Promoter check
  if (requirePromoter && profile?.role !== 'promoter') {
    return <Navigate to="/user-dashboard" replace />;
  }

  // Traveler check
  if (requireTraveler && profile?.role !== 'guest') {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
};