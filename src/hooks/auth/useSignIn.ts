
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleAuthError } from "@/utils/errorHandling";

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        toast({
          title: "Error de validación",
          description: "Por favor, introduce un email y contraseña válidos",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      console.log("Signing in user:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        handleAuthError(error);
        return;
      }

      toast({
        title: "¡Bienvenido de nuevo!",
        description: "Has iniciado sesión con éxito",
      });

      navigate("/");
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isLoading
  };
}
