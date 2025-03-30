
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";
import { fetchProfile, updateUserProfile } from "../authUtils";

interface AuthStateProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

export function useAuthMethods({ setIsLoading, setProfile }: AuthStateProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  // Signup function
  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      setIsLoading(true);
      
      // Determine if this is a hotel owner signup
      const isHotelOwner = userData?.is_hotel_owner === true;
      console.log(`Signing up user as ${isHotelOwner ? 'hotel owner' : 'traveler'} with email: ${email}`);
      
      // Add is_hotel_owner to user metadata for later reference during profile creation
      const metadata = {
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        is_hotel_owner: isHotelOwner
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        toast({
          title: "Error al registrarse",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        console.log("User created successfully:", data.user.id);
        
        // Ensure profile exists with proper flag
        try {
          // Attempt to fetch profile
          const profileData = await fetchProfile(data.user.id);
          
          if (!profileData) {
            // If no profile exists, create one explicitly with user data
            console.log("No profile found after signup, creating one...");
            await updateUserProfile(data.user, {
              id: data.user.id,
              first_name: userData?.first_name || null,
              last_name: userData?.last_name || null,
              is_hotel_owner: isHotelOwner,
            });
          } else {
            // If profile exists but needs update
            console.log("Updating existing profile with user data");
            await updateUserProfile(data.user, userData || {});
          }
        } catch (profileError) {
          console.error("Error ensuring profile exists:", profileError);
        }
      }

      toast({
        title: "¡Cuenta creada!",
        description: "Por favor, verifica tu correo electrónico para activar tu cuenta",
      });
      
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in function
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

  // Sign out function with aggressive cleanup
  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // First check if we have a valid session before trying to sign out
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        console.log("No active session found, redirecting to login without calling signOut API");
        // Clear local state regardless
        
        toast({
          title: "Sesión finalizada",
          description: "Tu sesión ha finalizado",
        });
        
        // Force page reload to clear any persistent state
        window.location.href = "/login";
        return;
      }
      
      console.log("Active session found, signing out properly");
      
      // Call signOut API with proper signout options to invalidate all sessions
      const { error } = await supabase.auth.signOut({
        scope: 'global' // Sign out from all sessions, not just current browser
      });

      if (error) {
        console.error("Error signing out:", error);
        toast({
          title: "Error al cerrar sesión",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión con éxito",
      });

      // Completely reload the application to clear any application state
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Error in signOut function:", error);
      toast({
        title: "Error al cerrar sesión",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (user: User | null, data: Partial<Profile>) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const updatedProfile = await updateUserProfile(user, data);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado con éxito",
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar perfil",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    updateProfile,
    authError
  };
}
