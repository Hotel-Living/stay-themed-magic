
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
      
      // First check if we have a valid session before trying to sign out
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        console.log("No active session found, redirecting to login without calling signOut API");
        // Clear local state regardless
        
        toast({
          title: "Sesión finalizada",
          description: "Tu sesión ha finalizado",
        });
        
        // Force page reload to clear any persistent state
        window.location.href = "/login";
        return;
      }
      
      console.log("Active session found, signing out properly");
      
      // Call signOut API with proper signout options to invalidate all sessions
      const { error } = await supabase.auth.signOut({
        scope: 'global' // Sign out from all sessions, not just current browser
      });

      if (error) {
        console.error("Error signing out:", error);
        toast({
          title: "Error al cerrar sesión",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión con éxito",
      });

      // Completely reload the application to clear any application state
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Error in signOut function:", error);
      toast({
        title: "Error al cerrar sesión",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut };
}
