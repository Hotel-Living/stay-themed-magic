
import { useAuth } from "@/context/AuthContext";

export function useAuthStatus() {
  const { profile, isLoading } = useAuth();
  
  const isGuest = profile?.role === 'guest';
  const isHotelOwner = profile?.role === 'hotel_owner';
  const isAdmin = profile?.role === 'admin';
  const isEmailVerified = profile?.email_verified || false;

  return {
    isGuest,
    isHotelOwner,
    isAdmin,
    isEmailVerified,
    isLoading
  };
}
