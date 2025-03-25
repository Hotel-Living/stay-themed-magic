
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleAuthError } from "@/utils/errorHandling";

export function usePasswordReset() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const requestPasswordReset = async (email: string) => {
    try {
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        toast({
          title: "Email inválido",
          description: "Por favor, introduce una dirección de email válida",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      console.log("Requesting password reset for:", email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        handleAuthError(error);
        return;
      }

      toast({
        title: "Email enviado",
        description: "Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico",
      });
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      if (!newPassword || newPassword.length < 6) {
        toast({
          title: "Contraseña débil",
          description: "La contraseña debe tener al menos 6 caracteres",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      console.log("Updating password");
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        handleAuthError(error);
        return;
      }

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada con éxito",
      });

      return true;
    } catch (error: any) {
      handleAuthError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    requestPasswordReset,
    updatePassword,
    isLoading
  };
}
