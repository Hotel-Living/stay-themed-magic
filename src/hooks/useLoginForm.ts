
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
      toast.error("Please fill in all fields");
      return;
    }
    
    console.log(`${isHotelLogin ? "Hotel" : "Traveler"} login attempt with:`, email);
    try {
      const result = await signIn(email, password, isHotelLogin);
      if (result.error) {
        toast.error("Error al iniciar sesión", {
          description: result.error
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Error al iniciar sesión", {
        description: error.message || "An unexpected error occurred"
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
