
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleAuthError } from "@/utils/errorHandling";
import { Profile } from "@/integrations/supabase/types-custom";

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
      
      setIsLoading(true);
      
      console.log("Signing up user:", email, userData);
      
      // First create the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) {
        handleAuthError(error);
        return;
      }

      // If we have userData, create a profile record
      if (userData && data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            ...userData,
            updated_at: new Date().toISOString()
          })
          .eq('id', data.user.id);

        if (profileError) {
          console.error("Error creating profile:", profileError);
          // We don't throw here because the auth account was created successfully
        }
      }

      toast({
        title: "¡Cuenta creada!",
        description: "Revisa tu correo electrónico para verificar tu cuenta.",
      });

      // Redirect to login page after signup
      navigate("/login");
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
