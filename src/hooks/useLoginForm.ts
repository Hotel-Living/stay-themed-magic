
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

export function useLoginForm(isHotelLogin: boolean = false) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log(`=== LOGIN FORM SUBMISSION STARTED ===`);
    console.log(`Login type: ${isHotelLogin ? "Hotel" : "Traveler"}`);
    console.log(`Email: ${email}`);
    console.log(`Password length: ${password.length}`);
    console.log(`Form timestamp: ${new Date().toISOString()}`);
    console.log(`Current URL: ${window.location.href}`);
    console.log(`Is preview: ${window.location.hostname.includes('lovable.app')}`);
    
    if (!email || !password) {
      const errorMsg = t('auth.invalidCredentials');
      console.log(`Validation error: ${errorMsg}`);
      toast({
        title: t('auth.invalidCredentials'),
        description: errorMsg,
        variant: "destructive"
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const errorMsg = t('auth.invalidCredentials');
      console.log(`Email validation error: ${errorMsg}`);
      toast({
        title: t('auth.invalidCredentials'),
        description: t('auth.invalidCredentials'),
        variant: "destructive"
      });
      return;
    }
    
    console.log("Form validation passed, calling signIn...");
    console.log(`Email being sent: "${email}"`);
    
    try {
      toast({
        title: t('auth.signingIn'),
        description: t('auth.signingIn')
      });
      
      const result = await signIn(email.trim(), password, isHotelLogin);
      
      console.log(`=== LOGIN FORM RESULT ===`);
      console.log(`Success: ${result.success}`);
      console.log(`Error: ${result.error}`);
      
      if (result.error) {
        console.error("Login failed, showing error toast");
        toast({
          title: t('auth.invalidCredentials'),
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
        title: t('auth.invalidCredentials'),
        description: error.message || t('auth.invalidCredentials'),
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
