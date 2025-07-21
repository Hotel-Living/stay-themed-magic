
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

export function useLoginForm(userType: "traveler" | "hotel" | "association" | "promoter") {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation('auth');

  const validateUserRole = (user: any, selectedType: string) => {
    console.log("Validating user role:", { selectedType, userMetadata: user.user_metadata });
    
    switch (selectedType) {
      case "traveler":
        // Travelers should not have hotel_owner flag, association_name, or promoter role
        if (user.user_metadata?.is_hotel_owner || 
            user.user_metadata?.association_name || 
            user.user_metadata?.role === 'promoter') {
          return false;
        }
        return true;
        
      case "hotel":
        // Hotel users must have is_hotel_owner flag or hotel-related metadata
        return user.user_metadata?.is_hotel_owner === true;
        
      case "association":
        // Association users must have association_name in metadata
        return !!user.user_metadata?.association_name;
        
      case "promoter":
        // Promoter users must have promoter role
        return user.user_metadata?.role === 'promoter';
        
      default:
        return false;
    }
  };

  const getRoleErrorMessage = (selectedType: string) => {
    switch (selectedType) {
      case "traveler":
        return "Esta cuenta no es una cuenta de viajero. Por favor, selecciona la pestaña correcta para tu tipo de cuenta.";
      case "hotel":
        return "Esta cuenta no pertenece a un hotel. Por favor, selecciona la pestaña correcta para tu tipo de cuenta.";
      case "association":
        return "Esta cuenta no pertenece a una asociación. Por favor, selecciona la pestaña correcta para tu tipo de cuenta.";
      case "promoter":
        return "Esta cuenta no es una cuenta de promotor. Por favor, selecciona la pestaña correcta para tu tipo de cuenta.";
      default:
        return "Tipo de cuenta no válido.";
    }
  };

  const getCorrectRedirectUrl = (user: any) => {
    // Check user metadata to determine correct redirect
    if (user.user_metadata?.association_name) {
      return "/panel-asociacion";
    } else if (user.user_metadata?.is_hotel_owner) {
      return "/hotel-dashboard";
    } else if (user.user_metadata?.role === 'promoter') {
      return "/promoter/dashboard";
    } else {
      return "/user-dashboard";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(`=== ROLE-VALIDATED LOGIN SUBMISSION STARTED ===`);
    console.log(`Selected login type: ${userType}`);
    console.log(`Email: ${email}`);
    console.log(`Password length: ${password.length}`);
    console.log(`Form timestamp: ${new Date().toISOString()}`);
    
    if (!email || !password) {
      const errorMsg = t('invalidCredentials');
      console.log(`Validation error: ${errorMsg}`);
      toast({
        title: t('invalidCredentials'),
        description: errorMsg,
        variant: "destructive"
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const errorMsg = t('invalidCredentials');
      console.log(`Email validation error: ${errorMsg}`);
      toast({
        title: t('invalidCredentials'),
        description: t('invalidCredentials'),
        variant: "destructive"
      });
      return;
    }
    
    console.log("Form validation passed, calling signIn with role validation...");
    
    try {
      toast({
        title: t('signingIn'),
        description: t('signingIn')
      });
      
      // First, attempt to sign in to get user data
      const result = await signIn(email.trim(), password, userType);
      
      console.log(`=== LOGIN FORM RESULT ===`);
      console.log(`Success: ${result.success}`);
      console.log(`Error: ${result.error}`);
      
      if (!result.success || result.error) {
        console.error("Login failed before role validation");
        toast({
          title: t('invalidCredentials'),
          description: result.error || t('invalidCredentials'),
          variant: "destructive"
        });
        return;
      }

      console.log("Login successful, role validation will be handled by signIn function");
      
    } catch (error: any) {
      console.error("=== LOGIN FORM EXCEPTION ===");
      console.error("Caught exception:", error);
      toast({
        title: t('invalidCredentials'),
        description: error.message || t('invalidCredentials'),
        variant: "destructive"
      });
    }
    
    console.log(`=== ROLE-VALIDATED LOGIN SUBMISSION COMPLETED ===`);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit,
    validateUserRole,
    getRoleErrorMessage,
    getCorrectRedirectUrl
  };
}
