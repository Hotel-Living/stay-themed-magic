
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "@/integrations/supabase/types-custom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleAuthError } from "@/utils/errorHandling";

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      if (!email || !password) {
        toast({
          title: "Error de validación",
          description: "Por favor, introduce un email y contraseña válidos",
          variant: "destructive",
        });
        return;
      }
      
      if (password.length < 6) {
        toast({
          title: "Contraseña débil",
          description: "La contraseña debe tener al menos 6 caracteres",
          variant: "destructive",
        });
        return;
      }
      
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
        handleAuthError(error);
        return;
      }

      if (data?.user?.identities?.length === 0) {
        toast({
          title: "Email ya registrado",
          description: "Este email ya está registrado. Por favor, inicia sesión.",
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
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    isLoading
  };
}
