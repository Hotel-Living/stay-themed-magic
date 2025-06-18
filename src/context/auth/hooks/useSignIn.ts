
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

  const signIn = async (email: string, password: string, isHotelLogin: boolean = false): Promise<SignInResult> => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      console.log(`=== AUTHENTICATION DEBUG ===`);
      console.log(`Login attempt - isHotelLogin: ${isHotelLogin}, email: ${email}`);
      console.log(`Current URL: ${window.location.href}`);
      console.log(`Environment: ${window.location.hostname}`);

      // First, try to sign out any existing session to start fresh
      await supabase.auth.signOut();
      console.log("Previous session cleared");

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Supabase auth response:", { data: !!data, error });

      if (error) {
        console.error("=== AUTHENTICATION ERROR ===");
        console.error("Error code:", error.message);
        console.error("Full error:", error);
        
        setAuthError(error.message);
        
        // Provide more specific error messages
        let userFriendlyError = error.message;
        if (error.message.includes("Invalid login credentials")) {
          userFriendlyError = "Email o contraseña incorrectos. Por favor, verifica tus datos.";
        } else if (error.message.includes("Email not confirmed")) {
          userFriendlyError = "Por favor, confirma tu email antes de iniciar sesión.";
        } else if (error.message.includes("Too many requests")) {
          userFriendlyError = "Demasiados intentos. Por favor, espera unos minutos.";
        }
        
        return { success: false, error: userFriendlyError };
      }

      if (data?.user) {
        console.log("=== USER AUTHENTICATED ===");
        console.log("User ID:", data.user.id);
        console.log("User email:", data.user.email);
        console.log("User metadata:", data.user.user_metadata);
        
        // Fetch or create profile data
        let profileData = await fetchProfile(data.user.id);
        console.log("Profile data fetched:", profileData);
        
        if (!profileData) {
          console.log("=== CREATING PROFILE ===");
          
          // Create profile with metadata from current user session
          const metadata = data.user.user_metadata || {};
          
          // Create profile with is_hotel_owner flag based on login context or metadata
          profileData = await updateUserProfile(data.user, {
            first_name: metadata.first_name || null,
            last_name: metadata.last_name || null,
            is_hotel_owner: isHotelLogin || metadata.is_hotel_owner === true,
          });
          console.log("Profile created:", profileData);
        } else {
          // If logging in through hotel login but not marked as hotel owner,
          // update the profile to mark as hotel owner
          if (isHotelLogin && !profileData.is_hotel_owner) {
            console.log("=== UPDATING PROFILE TO HOTEL OWNER ===");
            profileData = await updateUserProfile(data.user, {
              is_hotel_owner: true
            });
            console.log("Profile updated to hotel owner:", profileData);
          }
        }
        
        setProfile(profileData);
        console.log("Profile set in context:", profileData);
        
        // Handle redirection based on login type and user role
        console.log("=== HANDLING REDIRECTION ===");
        console.log("isHotelLogin:", isHotelLogin);
        console.log("profileData.is_hotel_owner:", profileData?.is_hotel_owner);
        
        if (isHotelLogin) {
          if (profileData?.is_hotel_owner === true) {
            console.log("✅ Hotel owner login confirmed, redirecting to hotel dashboard");
            toast({
              title: "Bienvenido",
              description: "Acceso de socio hotelero confirmado"
            });
            // Use a small delay to ensure state updates are processed
            setTimeout(() => {
              window.location.href = '/hotel-dashboard';
            }, 100);
          } else {
            console.error("❌ Non-hotel owner tried to log in through hotel login");
            toast({
              title: "Acceso denegado",
              description: "Esta cuenta no está registrada como propietario de hotel",
              variant: "destructive"
            });
            // Sign out the user since they're not a hotel owner
            await supabase.auth.signOut();
            return { success: false, error: "Esta cuenta no está registrada como propietario de hotel" };
          }
        } else {
          // Regular traveler login
          if (profileData?.is_hotel_owner === true) {
            console.log("✅ Hotel owner detected on traveler login, redirecting to hotel dashboard");
            toast({
              title: "Bienvenido",
              description: "Redirigiendo al panel de hotel"
            });
            setTimeout(() => {
              window.location.href = '/hotel-dashboard';
            }, 100);
          } else {
            console.log("✅ Traveler login confirmed, redirecting to user dashboard");
            toast({
              title: "Bienvenido",
              description: "Sesión iniciada correctamente"
            });
            setTimeout(() => {
              window.location.href = '/user-dashboard';
            }, 100);
          }
        }
        
        return { success: true, error: null };
      }
      
      console.error("❌ Authentication failed - no user data");
      return { success: false, error: "Error de autenticación" };
    } catch (err: any) {
      console.error("=== SIGN-IN EXCEPTION ===");
      console.error("Exception:", err);
      console.error("Stack:", err.stack);
      
      setAuthError("Error inesperado durante el inicio de sesión");
      return { 
        success: false, 
        error: err.message || "Ha ocurrido un error inesperado" 
      };
    } finally {
      setIsLoading(false);
      console.log("=== AUTHENTICATION PROCESS COMPLETED ===");
    }
  };

  return { signIn, authError };
}
