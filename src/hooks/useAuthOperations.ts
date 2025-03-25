
import { useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";

export function useAuthOperations() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      setIsLoading(true);
      
      // Include any additional metadata in signup
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
    user,
    setUser,
    session,
    setSession,
    isLoading,
    setIsLoading,
    signUp,
    signIn,
    signOut
  };
}
