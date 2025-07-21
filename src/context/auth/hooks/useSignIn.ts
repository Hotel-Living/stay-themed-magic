
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";

interface SignInProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

export function useSignIn({ setIsLoading, setProfile }: SignInProps) {
  const { toast } = useToast();

  const validateUserRole = (user: any, selectedType: string) => {
    console.log("Validating user role:", { selectedType, userMetadata: user.user_metadata });
    
    switch (selectedType) {
      case "traveler":
        // Travelers should not have hotel_owner flag, association_name, or promoter role
        if (user.user_metadata?.is_hotel_owner || 
            user.user_metadata?.association_name || 
            user.user_metadata?.role === 'promoter') {
          return {
            valid: false,
            message: "Esta cuenta no es una cuenta de viajero. Por favor, selecciona la pestaña correcta para tu tipo de cuenta."
          };
        }
        return { valid: true, message: "" };
        
      case "hotel":
        // Hotel users must have is_hotel_owner flag
        if (!user.user_metadata?.is_hotel_owner) {
          return {
            valid: false,
            message: "Esta cuenta no pertenece a un hotel. Por favor, selecciona la pestaña correcta para tu tipo de cuenta."
          };
        }
        return { valid: true, message: "" };
        
      case "association":
        // Association users must have association_name in metadata
        if (!user.user_metadata?.association_name) {
          return {
            valid: false,
            message: "Esta cuenta no pertenece a una asociación. Por favor, selecciona la pestaña correcta para tu tipo de cuenta."
          };
        }
        return { valid: true, message: "" };
        
      case "promoter":
        // Promoter users must have promoter role
        if (user.user_metadata?.role !== 'promoter') {
          return {
            valid: false,
            message: "Esta cuenta no es una cuenta de promotor. Por favor, selecciona la pestaña correcta para tu tipo de cuenta."
          };
        }
        return { valid: true, message: "" };
        
      default:
        return { valid: false, message: "Tipo de cuenta no válido." };
    }
  };

  const getCorrectRedirectUrl = (user: any) => {
    // Check user metadata to determine correct redirect based on actual role
    if (user.user_metadata?.association_name) {
      return "/panel-asociacion";
    } else if (user.user_metadata?.is_hotel_owner) {
      return "/hotel-dashboard";
    } else if (user.user_metadata?.role === 'promoter') {
      return "/promoter/dashboard";
    } else {
      return "/user-dashboard";
    }
  };

  const signIn = async (email: string, password: string, userType: "traveler" | "hotel" | "association" | "promoter") => {
    try {
      console.log("useSignIn: Starting authentication with role validation", { email, userType });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Authentication error:", error);
        throw error;
      }

      if (!data.user) {
        throw new Error("No user data returned from authentication");
      }

      console.log("Authentication successful, validating role:", data.user.id);

      // CRITICAL: Validate user role against selected tab
      const roleValidation = validateUserRole(data.user, userType);
      
      if (!roleValidation.valid) {
        console.error("Role validation failed:", roleValidation.message);
        
        // Sign out the user since role doesn't match
        await supabase.auth.signOut();
        
        return {
          success: false,
          error: roleValidation.message
        };
      }

      console.log("Role validation passed for user type:", userType);

      // Success toast based on validated user type
      const welcomeMessage = {
        traveler: "Bienvenido de vuelta, viajero",
        hotel: "Bienvenido, hotel partner", 
        association: "Bienvenido, miembro de asociación",
        promoter: "Bienvenido, promotor"
      }[userType];

      toast({
        title: "Inicio de sesión exitoso",
        description: welcomeMessage
      });

      // Determine redirect URL based on ACTUAL user metadata (not selected tab)
      const redirectUrl = getCorrectRedirectUrl(data.user);

      console.log("Role validation complete, auth state handler will handle redirect to:", redirectUrl);

      return { success: true, error: null };

    } catch (error: any) {
      console.error("Error in useSignIn:", error);
      
      let errorMessage = "Error al iniciar sesión";
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Credenciales inválidas";
      } else if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Por favor confirma tu email";
      }
      
      return { success: false, error: errorMessage };
    }
  };

  return { signIn };
}
