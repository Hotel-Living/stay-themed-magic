
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "@/integrations/supabase/types-custom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      setIsLoading(true);
      
      const metadata = {
        first_name: userData?.first_name || "",
        last_name: userData?.last_name || "",
        is_hotel_owner: userData?.is_hotel_owner || false
      };
      
      console.log("Signing up with metadata:", metadata);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        toast({
          title: "Error al registrarse",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "¡Cuenta creada!",
        description: "Por favor verifica tu correo electrónico para confirmar tu cuenta",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    isLoading
  };
}
