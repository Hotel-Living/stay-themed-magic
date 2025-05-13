
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";
import { fetchProfile, updateUserProfile } from "../authUtils";

interface SignInProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

interface SignInResult {
  success: boolean;
  error: string | null;
}

export function useSignIn({ setIsLoading, setProfile }: SignInProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  const signIn = async (email: string, password: string): Promise<SignInResult> => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      // Determine login type from the current URL
      const isHotelLogin = window.location.pathname.includes('hotel-login');
      console.log(`Login attempt from: ${window.location.pathname}, isHotelLogin: ${isHotelLogin}`);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
        console.error("Auth error:", error);
        return { success: false, error: error.message };
      }

      if (data?.user) {
        console.log("User authenticated successfully, checking profile...");
        
        // Fetch or create profile data
        let profileData = await fetchProfile(data.user.id);
        
        if (!profileData) {
          console.log("No profile found for authenticated user, creating one...");
          
          // Create profile with metadata from current user session
          const metadata = data.user.user_metadata || {};
          
          // Create profile with is_hotel_owner flag based on login context or metadata
          const isHotelOwner = isHotelLogin || metadata.is_hotel_owner === true;
          profileData = await updateUserProfile(data.user, {
            first_name: metadata.first_name || null,
            last_name: metadata.last_name || null,
            is_hotel_owner: isHotelOwner,
          });
        } else {
          // If logging in through hotel login but not marked as hotel owner,
          // update the profile to mark as hotel owner
          if (isHotelLogin && !profileData.is_hotel_owner) {
            console.log("Updating profile to mark as hotel owner");
            profileData = await updateUserProfile(data.user, {
              is_hotel_owner: true
            });
          }
        }
        
        setProfile(profileData);
        console.log("Profile data after login:", profileData);
        
        // Handle redirection based on login type and user role
        if (isHotelLogin) {
          if (profileData?.is_hotel_owner === true) {
            // Hotel owner logged in through hotel login page
            console.log("Hotel owner login confirmed, redirecting to hotel dashboard");
            window.location.href = '/hotel-dashboard';
          } else {
            // This case shouldn't happen now with our updated logic
            console.error("Non-hotel owner tried to log in through hotel login");
            toast({
              title: "Acceso denegado",
              description: "Esta cuenta no está registrada como propietario de hotel",
              variant: "destructive",
            });
            // Sign out the user since they're not a hotel owner
            await supabase.auth.signOut();
            return { success: false, error: "Esta cuenta no está registrada como propietario de hotel" };
          }
        } else {
          // Regular traveler login
          if (profileData?.is_hotel_owner === true) {
            console.log("Hotel owner detected on traveler login, redirecting to hotel dashboard");
            window.location.href = '/hotel-dashboard';
          } else {
            console.log("Traveler login confirmed, redirecting to user dashboard");
            window.location.href = '/user-dashboard';
          }
        }
        
        return { success: true, error: null };
      }
      
      return { success: false, error: "Authentication failed" };
    } catch (err: any) {
      console.error("Sign-in error:", err);
      setAuthError("An unexpected error occurred during sign in");
      return { 
        success: false, 
        error: err.message || "Ha ocurrido un error inesperado" 
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, authError };
}
