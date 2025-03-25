
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleAuthError } from "@/utils/errorHandling";

export function useSignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      console.log("Signing out user");
      
      const { error } = await supabase.auth.signOut();

      if (error) {
        handleAuthError(error);
        return;
      }

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión con éxito",
      });

      // Use replace instead of navigate to prevent going back to authenticated routes
      navigate("/login", { replace: true });
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signOut,
    isLoading
  };
}
