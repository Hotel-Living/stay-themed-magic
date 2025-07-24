
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function useLoginForm(userType: "traveler" | "hotel" | "association" | "promoter") {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
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
        console.log("Login successful, setting up feedback and fallback");
        
        // Show success feedback
        toast({
          title: "✅ Success! Redirecting…",
          description: "You have been successfully logged in"
        });
        
        // Set up fallback mechanism after 3 seconds (reduced from 5)
        setTimeout(() => {
          console.log("Activating fallback mechanism");
          setShowFallback(true);
          setIsLoading(false);
        }, 3000);
        
      } else {
        console.log("Login failed:", result.error);
        // Error toast is already shown in signIn function
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Login form error:", error);
      toast({
        title: "❌ Something went wrong. Please try again.",
        description: "Ocurrió un error durante el inicio de sesión",
        variant: "destructive"
      });
      setIsLoading(false);
    }

    console.log("=== LOGIN FORM SUBMIT END ===");
  };

  const handleFallbackRedirect = () => {
    const dashboardUrl = userType === "hotel" ? "/hotel-dashboard" : 
                        userType === "association" ? "/association-dashboard" :
                        userType === "promoter" ? "/promoter-dashboard" : 
                        "/user-dashboard";
    window.location.href = dashboardUrl;
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    showFallback,
    handleSubmit,
    handleFallbackRedirect
  };
}
