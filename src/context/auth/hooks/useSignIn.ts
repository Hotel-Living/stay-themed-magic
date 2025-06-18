
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
      
      console.log(`=== COMPREHENSIVE AUTHENTICATION DEBUG ===`);
      console.log(`Login attempt details:`);
      console.log(`- Email: ${email}`);
      console.log(`- Password length: ${password.length}`);
      console.log(`- Is hotel login: ${isHotelLogin}`);
      console.log(`- Current URL: ${window.location.href}`);
      console.log(`- User agent: ${navigator.userAgent}`);
      console.log(`- Storage available: ${typeof window.localStorage !== 'undefined'}`);

      // Check current session before attempting login
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log(`Current session check:`, { 
        hasSession: !!sessionData.session, 
        error: sessionError,
        user: sessionData.session?.user?.email 
      });

      // Clear any existing session
      console.log("Clearing existing session...");
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        console.warn("Sign out error (non-critical):", signOutError);
      }

      // Add delay to ensure session is cleared
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log("Attempting authentication with Supabase...");
      const startTime = Date.now();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      const authTime = Date.now() - startTime;
      console.log(`Authentication response received in ${authTime}ms`);
      console.log("Auth response:", { 
        hasData: !!data, 
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        error: error?.message,
        errorCode: error?.name
      });

      if (error) {
        console.error("=== DETAILED AUTHENTICATION ERROR ===");
        console.error("Error details:", {
          message: error.message,
          name: error.name,
          status: (error as any).status,
          code: (error as any).code,
          stack: error.stack
        });
        
        setAuthError(error.message);
        
        // Provide specific error messages
        let userFriendlyError = error.message;
        if (error.message.toLowerCase().includes("invalid login credentials")) {
          userFriendlyError = "Credenciales inválidas. Verifica tu email y contraseña.";
          
          // Additional debugging for invalid credentials
          console.log("=== INVALID CREDENTIALS DEBUG ===");
          console.log(`Email format valid: ${/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}`);
          console.log(`Password not empty: ${password.length > 0}`);
          console.log("Checking if user exists in auth.users table...");
          
        } else if (error.message.includes("Email not confirmed")) {
          userFriendlyError = "Confirma tu email antes de iniciar sesión.";
        } else if (error.message.includes("Too many requests")) {
          userFriendlyError = "Demasiados intentos. Espera unos minutos.";
        }
        
        return { success: false, error: userFriendlyError };
      }

      if (data?.user && data?.session) {
        console.log("=== AUTHENTICATION SUCCESSFUL ===");
        console.log("User details:", {
          id: data.user.id,
          email: data.user.email,
          emailConfirmed: data.user.email_confirmed_at,
          lastSignIn: data.user.last_sign_in_at,
          createdAt: data.user.created_at
        });
        
        console.log("Session details:", {
          accessToken: data.session.access_token ? "Present" : "Missing",
          refreshToken: data.session.refresh_token ? "Present" : "Missing",
          expiresAt: data.session.expires_at,
          tokenType: data.session.token_type
        });
        
        // Fetch or create profile
        console.log("Fetching user profile...");
        let profileData = await fetchProfile(data.user.id);
        console.log("Profile fetch result:", profileData);
        
        if (!profileData) {
          console.log("Creating new profile...");
          const metadata = data.user.user_metadata || {};
          
          profileData = await updateUserProfile(data.user, {
            first_name: metadata.first_name || null,
            last_name: metadata.last_name || null,
            is_hotel_owner: isHotelLogin || metadata.is_hotel_owner === true,
          });
          console.log("Profile created:", profileData);
        } else if (isHotelLogin && !profileData.is_hotel_owner) {
          console.log("Updating profile to hotel owner...");
          profileData = await updateUserProfile(data.user, {
            is_hotel_owner: true
          });
        }
        
        setProfile(profileData);
        
        // Handle redirection
        console.log("=== HANDLING REDIRECTION ===");
        const redirectUrl = isHotelLogin ? '/hotel-dashboard' : 
                           profileData?.is_hotel_owner ? '/hotel-dashboard' : '/user-dashboard';
        
        console.log(`Redirecting to: ${redirectUrl}`);
        
        toast({
          title: "Bienvenido",
          description: "Sesión iniciada correctamente"
        });
        
        // Use setTimeout to ensure state updates complete
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 200);
        
        return { success: true, error: null };
      }
      
      console.error("❌ No user data received from authentication");
      return { success: false, error: "Error de autenticación - sin datos de usuario" };
      
    } catch (err: any) {
      console.error("=== SIGN-IN EXCEPTION ===");
      console.error("Exception details:", {
        message: err.message,
        name: err.name,
        stack: err.stack,
        toString: err.toString()
      });
      
      setAuthError("Error inesperado durante el inicio de sesión");
      return { 
        success: false, 
        error: err.message || "Error inesperado durante la autenticación" 
      };
    } finally {
      setIsLoading(false);
      console.log("=== AUTHENTICATION PROCESS COMPLETED ===");
    }
  };

  return { signIn, authError };
}
