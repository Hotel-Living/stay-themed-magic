
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function useLoginForm(userType: "traveler" | "hotel" | "association" | "promoter") {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor ingresa tu email y contraseña",
        variant: "destructive"
      });
      return;
    }

    console.log("=== LOGIN FORM SUBMIT ===");
    console.log("User type:", userType);
    console.log("Email:", email);

    setIsLoading(true);

    try {
      const result = await signIn(email, password, userType);
      
      console.log("Sign in result:", result);

      if (result.success) {
        console.log("Login successful, auth state will handle redirect");
        // Don't show success toast as user will be redirected immediately
      } else {
        console.log("Login failed:", result.error);
        // Error toast is already shown in signIn function
      }
    } catch (error: any) {
      console.error("Login form error:", error);
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error durante el inicio de sesión",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }

    console.log("=== LOGIN FORM SUBMIT END ===");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit
  };
}
