
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthStatus } from "@/hooks/useAuthStatus";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireHotelOwner?: boolean;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requireHotelOwner = false,
  requireAdmin = false
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const { isHotelOwner, isAdmin } = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    // If not authenticated and authentication is required
    if (!user && requireAuth) {
      navigate("/login", { replace: true });
      return;
    }

    // If authenticated but doesn't have required role
    if (user) {
      if (requireHotelOwner && !isHotelOwner) {
        navigate("/", { replace: true });
        return;
      }

      if (requireAdmin && !isAdmin) {
        navigate("/", { replace: true });
        return;
      }
    }
  }, [user, isLoading, requireAuth, requireHotelOwner, requireAdmin, isHotelOwner, isAdmin, navigate]);

  // Show nothing while loading
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If all checks pass, render the children
  return <>{children}</>;
}
