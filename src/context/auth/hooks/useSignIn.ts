
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";
import { fetchProfile } from "../authUtils";

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

      console.log("=== SIGN IN START ===");
      console.log("Email:", email);
      console.log("Selected user type:", userType);

      // Attempt to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase sign in error:", error);
        setSignInError(error.message);
        toast({
          title: "Error al iniciar sesión",
          description: error.message,
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
