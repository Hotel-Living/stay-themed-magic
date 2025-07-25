import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";
import { fetchProfile } from "../authUtils";
import { validateEmail, sanitizeInput } from "@/utils/passwordValidation";

interface SignInProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

export function useSignIn({ setIsLoading, setProfile }: SignInProps) {
  const [signInError, setSignInError] = useState<string | null>(null);
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setSignInError(null);

      // Client-side validation
      if (!validateEmail(email)) {
        const errorMsg = "Please enter a valid email address";
        setSignInError(errorMsg);
        toast({
          title: "Invalid Email",
          description: errorMsg,
          variant: "destructive"
        });
        return { success: false, error: errorMsg };
      }

      // Sanitize email input
      const sanitizedEmail = sanitizeInput(email);

      console.log("=== SIGN IN START ===");
      console.log("Email:", sanitizedEmail);

      // Attempt to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password,
      });

      // Critical: Check for any authentication error, including 400 errors
      if (error) {
        console.error("❌ SUPABASE AUTHENTICATION FAILED ❌");
        console.error("Error type:", error.name);
        console.error("Error message:", error.message);
        console.error("Error status:", error.status);
        console.error("Full error object:", error);
        
        // Force sign out to prevent false positive sessions
        try {
          await supabase.auth.signOut({ scope: 'global' });
          console.log("Forced sign out completed after auth error");
        } catch (signOutError) {
          console.error("Failed to force sign out:", signOutError);
        }
        
        setSignInError(error.message);
        toast({
          title: "❌ Authentication Failed",
          description: error.message || "Invalid credentials. Please check your email and password.",
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }

      if (!data.user) {
        console.error("No user data returned from Supabase");
        const errorMsg = "No se pudo obtener la información del usuario";
        setSignInError(errorMsg);
        toast({
          title: "Error al iniciar sesión",
          description: errorMsg,
          variant: "destructive"
        });
        return { success: false, error: errorMsg };
      }

      // User authenticated successfully - no role validation needed here
      // The auth state handler will automatically route based on stored role
      console.log("User authenticated successfully");
      console.log("User metadata:", data.user.user_metadata);

      // Fetch profile data
      try {
        const profileData = await fetchProfile(data.user.id);
        setProfile(profileData);
        console.log("Profile data fetched:", profileData);
      } catch (profileError) {
        console.warn("Could not fetch profile:", profileError);
        // Don't fail the login if profile fetch fails
      }

      console.log("Sign in process completed successfully");
      console.log("Auth state handler will manage the redirect based on actual user role");
      console.log("=== SIGN IN END ===");

      return { success: true, error: null };

    } catch (error: any) {
      console.error("Unexpected error during sign in:", error);
      const errorMessage = error.message || "Error inesperado durante el inicio de sesión";
      setSignInError(errorMessage);
      toast({
        title: "Error inesperado",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signInError
  };
}