
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      console.log("Signing in user:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error al iniciar sesión",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "¡Bienvenido de nuevo!",
        description: "Has iniciado sesión con éxito",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isLoading
  };
}
