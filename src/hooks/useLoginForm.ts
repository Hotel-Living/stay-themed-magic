
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function useLoginForm(isHotelLogin: boolean = false) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa el email y la contraseña",
        variant: "destructive"
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, introduce un email válido",
        variant: "destructive"
      });
      return;
    }
    
    console.log(`=== LOGIN FORM SUBMISSION ===`);
    console.log(`${isHotelLogin ? "Hotel" : "Traveler"} login attempt with:`, email);
    console.log("Form data:", { email, passwordLength: password.length, isHotelLogin });
    
    try {
      toast({
        title: "Iniciando sesión...",
        description: "Por favor, espera un momento"
      });
      
      const result = await signIn(email, password, isHotelLogin);
      
      console.log("Login result:", result);
      
      if (result.error) {
        console.error("Login failed with error:", result.error);
        toast({
          title: "Error al iniciar sesión",
          description: result.error,
          variant: "destructive"
        });
      } else {
        console.log("Login successful!");
        // Success message will be shown by the signIn function
      }
    } catch (error: any) {
      console.error("=== LOGIN FORM ERROR ===");
      console.error("Login error:", error);
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Error inesperado. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    }
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
