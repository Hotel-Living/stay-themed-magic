
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/integrations/supabase/types-custom";
import { useSignUp } from "./useSignUp";
import { useSignIn } from "./useSignIn";
import { useProfileManagement } from "./useProfileManagement";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthStateProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
  setUser: (user: User | null) => void;
  setSession: (session: any) => void;
}

export function useAuthMethods({ setIsLoading, setProfile, setUser, setSession }: AuthStateProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Use refactored hooks
  const { signUp } = useSignUp({ setIsLoading, setProfile });
  const { signIn: signInHook } = useSignIn({ setIsLoading, setProfile });
  const { updateProfile } = useProfileManagement({ setIsLoading, setProfile });

  // Centralized signIn function with proper error handling
  const signIn = async (email: string, password: string, isHotelLogin?: boolean) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      console.log("Starting sign in process", { email, isHotelLogin });
      
      const result = await signInHook(email, password, isHotelLogin);
      
      console.log("Sign in result:", result);
      
      return result;
    } catch (error: any) {
      console.error("Error in signIn function:", error);
      setAuthError(error.message);
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Centralized signOut function - SINGLE SOURCE OF TRUTH
  const signOut = async () => {
    try {
      setIsLoading(true);
      
      console.log("Starting centralized logout process");
      
      // Step 1: Clear React state immediately
      setUser(null);
      setSession(null);
      setProfile(null);
      
      // Step 2: Call Supabase signOut
      const { error } = await supabase.auth.signOut({
        scope: 'global'
      });

      if (error) {
        console.error("Supabase signOut error:", error);
        // Don't throw here, continue with cleanup
      }
      
      console.log("Supabase signOut completed");
      
      // Step 3: Clear any persistent storage
      try {
        localStorage.removeItem('supabase.auth.token');
      } catch (storageError) {
        console.warn("Storage cleanup error:", storageError);
      }
      
      // Step 4: Success feedback
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión con éxito"
      });

      // Step 5: Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);

    } catch (error: any) {
      console.error("Error in centralized signOut function:", error);
      
      // Even on error, try to clear state and redirect
      setUser(null);
      setSession(null);
      setProfile(null);
      
      toast({
        title: "Error al cerrar sesión",
        description: "Sesión cerrada forzosamente",
        variant: "destructive"
      });
      
      // Force redirect even on error
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
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
