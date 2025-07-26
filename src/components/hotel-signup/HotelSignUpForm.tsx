
import { useState } from "react";
import { Building, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { InputField } from "@/components/auth/InputField";
import { PasswordField } from "@/components/auth/PasswordField";
import { TermsCheckbox } from "@/components/auth/TermsCheckbox";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { HotelTerms } from "./HotelTerms";
import { validatePassword } from "@/utils/passwordValidation";

export function HotelSignUpForm() {
  const [hotelName, setHotelName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptBusinessTerms, setAcceptBusinessTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hotelName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const { isValid } = validatePassword(password);
    if (!isValid) {
      toast({
        title: "Error", 
        description: "Please ensure your password meets all requirements",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match", 
        variant: "destructive"
      });
      return;
    }
    
    if (!acceptTerms || !acceptBusinessTerms) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: hotelName,
            last_name: null,
            is_hotel_owner: true,
            role: "hotel"
          }
        }
      });
      
      if (error) {
        toast({
          title: "Registration Error",
          description: error.message,
          variant: "destructive"
        });
      } else if (data.user) {
        toast({
          title: "Registration Successful", 
          description: "Please check your email for a confirmation link before signing in."
        });
        navigate('/register-role');
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Registration Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <InputField
        id="hotelName"
        label="Hotel/Property Name"
        type="text"
        value={hotelName}
        onChange={(e) => setHotelName(e.target.value)}
        placeholder="Enter your hotel or property name"
        Icon={Building}
      />
      
      <InputField
        id="email"
        label="Business Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your business email"
        Icon={Mail}
      />
      
      <PasswordField
        id="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create a password"
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
        showValidation
      />
      
      <PasswordField
        id="confirmPassword"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
        showValidation
      />
      
      <HotelTerms 
        acceptTerms={acceptTerms}
        acceptBusinessTerms={acceptBusinessTerms}
        onAcceptTermsChange={() => setAcceptTerms(!acceptTerms)}
        onAcceptBusinessTermsChange={() => setAcceptBusinessTerms(!acceptBusinessTerms)}
      />
      
      <SubmitButton
        isLoading={isLoading}
        loadingText="Creating account..."
        text="Register as Hotel Partner"
      />
    </form>
  );
}
