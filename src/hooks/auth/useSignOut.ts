
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error al cerrar sesión",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signOut,
    isLoading
  };
}
