
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

  const validateUserRole = (userMetadata: any, selectedUserType: string) => {
    console.log("=== ROLE VALIDATION START ===");
    console.log("Selected user type:", selectedUserType);
    console.log("User metadata:", userMetadata);
    
    switch (selectedUserType) {
      case "traveler":
        // Traveler: should NOT have hotel owner, association, or promoter flags
        const isTraveler = !userMetadata?.is_hotel_owner && 
                          !userMetadata?.association_name && 
                          userMetadata?.role !== 'promoter';
        console.log("Is valid traveler:", isTraveler);
        return isTraveler;
        
      case "hotel":
        // Hotel: must have is_hotel_owner = true
        const isHotelOwner = userMetadata?.is_hotel_owner === true;
        console.log("Is valid hotel owner:", isHotelOwner);
        return isHotelOwner;
        
      case "association":
        // Association: must have association_name
        const hasAssociationName = !!userMetadata?.association_name;
        console.log("Has association name:", hasAssociationName, userMetadata?.association_name);
        return hasAssociationName;
        
      case "promoter":
        // Promoter: must have role = 'promoter'
        const isPromoter = userMetadata?.role === 'promoter';
        console.log("Is valid promoter:", isPromoter);
        return isPromoter;
        
      default:
        console.log("Unknown user type:", selectedUserType);
        return false;
    }
  };

  const getRoleErrorMessage = (selectedUserType: string) => {
    switch (selectedUserType) {
      case "traveler":
        return "Este email no pertenece a una cuenta de viajero";
      case "hotel":
        return "Este email no pertenece a una cuenta de hotel";
      case "association":
        return "Este email no pertenece a una cuenta de asociación";
      case "promoter":
        return "Este email no pertenece a una cuenta de promotor";
      default:
        return "Tipo de usuario no válido";
    }
  };

  const signIn = async (email: string, password: string, userType: "traveler" | "hotel" | "association" | "promoter") => {
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
      console.log("Selected user type:", userType);

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

      // Check if email is confirmed
      if (!data.user.email_confirmed_at) {
        console.log("Email not confirmed");
        // Sign out the user since email is not confirmed
        await supabase.auth.signOut();
        
        const emailErrorMsg = "Please confirm your email before accessing your account";
        setSignInError(emailErrorMsg);
        toast({
          title: "Email Confirmation Required",
          description: emailErrorMsg,
          variant: "destructive"
        });
        return { success: false, error: emailErrorMsg };
      }

      console.log("Supabase sign in successful");
      console.log("User metadata:", data.user.user_metadata);

      // Validate user role against selected tab
      const isValidRole = validateUserRole(data.user.user_metadata, userType);
      
      if (!isValidRole) {
        console.log("Role validation failed");
        
        // Sign out the user since they don't have the right role
        await supabase.auth.signOut();
        
        const roleErrorMessage = getRoleErrorMessage(userType);
        setSignInError(roleErrorMessage);
        toast({
          title: "Error de autorización",
          description: roleErrorMessage,
          variant: "destructive"
        });
        return { success: false, error: roleErrorMessage };
      }

      console.log("Role validation successful");

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
      console.log("Auth state handler will manage the redirect");
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
