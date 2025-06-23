
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SignOutProps {
  setIsLoading: (isLoading: boolean) => void;
}

export function useSignOut({ setIsLoading }: SignOutProps) {
  const { toast } = useToast();

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      console.log("Starting centralized logout process");
      
      // Always call Supabase signOut regardless of session state
      const { error } = await supabase.auth.signOut({
        scope: 'global' // Sign out from all sessions
      });

      if (error) {
        console.error("Error signing out:", error);
        throw error;
      }
      
      console.log("Supabase signOut completed successfully");
      
      // Clear any local storage items that might persist user data
      localStorage.removeItem('supabase.auth.token');
      
      // Success toast
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión con éxito"
      });

      // Force a complete page reload to clear all application state
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);

    } catch (error: any) {
      console.error("Error in centralized signOut function:", error);
      toast({
        title: "Error al cerrar sesión",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive"
      });
      
      // Even on error, attempt to redirect after a delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut };
}
