
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
    
    console.log(`=== LOGIN FORM SUBMISSION STARTED ===`);
    console.log(`Login type: ${isHotelLogin ? "Hotel" : "Traveler"}`);
    console.log(`Email: ${email}`);
    console.log(`Password length: ${password.length}`);
    console.log(`Form timestamp: ${new Date().toISOString()}`);
    
    if (!email || !password) {
      const errorMsg = "Por favor, completa el email y la contraseña";
      console.log(`Validation error: ${errorMsg}`);
      toast({
        title: "Campos requeridos",
        description: errorMsg,
        variant: "destructive"
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const errorMsg = "Email format is invalid";
      console.log(`Email validation error: ${errorMsg}`);
      toast({
        title: "Email inválido",
        description: "Por favor, introduce un email válido",
        variant: "destructive"
      });
      return;
    }
    
    console.log("Form validation passed, calling signIn...");
    
    try {
      toast({
        title: "Iniciando sesión...",
        description: "Por favor, espera un momento"
      });
      
      const result = await signIn(email, password, isHotelLogin);
      
      console.log(`=== LOGIN FORM RESULT ===`);
      console.log(`Success: ${result.success}`);
      console.log(`Error: ${result.error}`);
      
      if (result.error) {
        console.error("Login failed, showing error toast");
        toast({
          title: "Error al iniciar sesión",
          description: result.error,
          variant: "destructive"
        });
      } else {
        console.log("Login successful, success toast should be shown by signIn function");
      }
    } catch (error: any) {
      console.error("=== LOGIN FORM EXCEPTION ===");
      console.error("Caught exception:", error);
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Error inesperado. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    }
    
    console.log(`=== LOGIN FORM SUBMISSION COMPLETED ===`);
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
