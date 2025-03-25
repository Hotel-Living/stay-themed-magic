
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleAuthError } from "@/utils/errorHandling";

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string, rememberMe = false) => {
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
        options: {
          // Set the session expiration time based on rememberMe option
          // Default is 1 hour, extended to 30 days if rememberMe is true
          expiresIn: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60
        }
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
