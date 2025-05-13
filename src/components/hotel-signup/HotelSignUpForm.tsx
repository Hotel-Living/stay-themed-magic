
import { useState } from "react";
import { Building, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
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
  const { signUp, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hotelName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const { isValid } = validatePassword(password);
    if (!isValid) {
      toast.error("Please ensure your password meets all requirements");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (!acceptTerms || !acceptBusinessTerms) {
      toast.error("You must accept the terms and conditions");
      return;
    }
    
    try {
      const result = await signUp(email, password, {
        first_name: hotelName,
        last_name: null,
        is_hotel_owner: true
      });
      
      if (result && result.error) {
        toast.error("Registration Error", {
          description: result.error
        });
      } else if (result && result.success) {
        toast.success("Registration Successful", {
          description: "You can now log in with your credentials"
        });
        navigate('/hotel-login');
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error("Registration Error", {
        description: error.message || "An unexpected error occurred"
      });
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
