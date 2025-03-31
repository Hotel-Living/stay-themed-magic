
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";
import { fetchProfile, updateUserProfile } from "../authUtils";

interface SignInProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

export function useSignIn({ setIsLoading, setProfile }: SignInProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
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
        toast({
          title: "Error al iniciar sesión",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data?.user) {
        console.log("User authenticated successfully, checking profile...");
        
        // Fetch or create profile data
        let profileData = await fetchProfile(data.user.id);
        
        if (!profileData) {
          console.log("No profile found for authenticated user, creating one...");
          // Get user metadata from auth
          const { data: userData } = await supabase.auth.getUser();
          const metadata = userData?.user?.user_metadata || {};
          
          // Create profile with metadata
          const isHotelOwner = metadata.is_hotel_owner === true;
          profileData = await updateUserProfile(data.user, {
            first_name: metadata.first_name || null,
            last_name: metadata.last_name || null,
            is_hotel_owner: isHotelOwner,
          });
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
            // Non-hotel owner tried to log in through hotel login
            console.error("Non-hotel owner tried to log in through hotel login");
            toast({
              title: "Acceso denegado",
              description: "Esta cuenta no está registrada como propietario de hotel",
              variant: "destructive",
            });
            // Sign out the user since they're not a hotel owner
            await supabase.auth.signOut();
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
      }
    } catch (err: any) {
      console.error("Sign-in error:", err);
      setAuthError("An unexpected error occurred during sign in");
      toast({
        title: "Error al iniciar sesión",
        description: err.message || "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, authError };
}
