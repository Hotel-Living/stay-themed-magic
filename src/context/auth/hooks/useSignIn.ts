
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";

interface SignInProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

export function useSignIn({ setIsLoading, setProfile }: SignInProps) {
  const { toast } = useToast();

  const signIn = async (email: string, password: string, isHotelLogin?: boolean) => {
    try {
      console.log("useSignIn: Starting authentication", { email, isHotelLogin });
      
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

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Profile fetch error:", profileError);
        // Don't throw here, just log the error
      }

      if (profileData) {
        setProfile(profileData);
        console.log("Profile loaded:", profileData);
      }

      // Success toast
      toast({
        title: "Inicio de sesión exitoso",
        description: isHotelLogin ? "Bienvenido, hotel partner" : "Bienvenido de vuelta"
      });

      // Redirect based on login type
      setTimeout(() => {
        if (isHotelLogin) {
          window.location.href = "/hotel-dashboard";
        } else {
          window.location.href = "/user-dashboard";
        }
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
