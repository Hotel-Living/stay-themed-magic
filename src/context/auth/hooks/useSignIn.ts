
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";

interface SignInProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

export function useSignIn({ setIsLoading, setProfile }: SignInProps) {
  const { toast } = useToast();

  const signIn = async (email: string, password: string, userType: "traveler" | "hotel" | "association" | "promoter") => {
    try {
      console.log("useSignIn: Starting authentication", { email, userType });
      
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

      console.log("Authentication successful:", data.user.id);

      // Profile will be loaded by the auth state change listener
      // Don't fetch it here to avoid conflicts
      
      // Success toast
      const welcomeMessage = {
        traveler: "Bienvenido de vuelta",
        hotel: "Bienvenido, hotel partner", 
        association: "Bienvenido, miembro de asociación",
        promoter: "Bienvenido, promotor"
      }[userType];

      toast({
        title: "Inicio de sesión exitoso",
        description: welcomeMessage
      });

      // Redirect based on user type
      const dashboardUrls = {
        traveler: "/user-dashboard",
        hotel: "/hotel-dashboard",
        association: "/panel-asociacion",
        promoter: "/promoter/dashboard"
      };

      setTimeout(() => {
        window.location.href = dashboardUrls[userType];
      }, 500);

      return { success: true, error: null };

    } catch (error: any) {
      console.error("Error in useSignIn:", error);
      
      let errorMessage = "Error al iniciar sesión";
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Credenciales inválidas";
      } else if (error.message?.includes("Email not confirmed")) {
        errorMessage = "Por favor confirma tu email";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });

      return { success: false, error: errorMessage };
    }
  };

  return { signIn };
}
