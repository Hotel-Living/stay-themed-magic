
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { InputField } from "@/components/auth/InputField";
import { PasswordField } from "@/components/auth/PasswordField";
import { TermsCheckbox } from "@/components/auth/TermsCheckbox";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { validatePassword } from "@/utils/passwordValidation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { signUp, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
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
    
    if (!acceptTerms) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions",
        variant: "destructive"
      });
      return;
    }
    
    // Divides the name into first and last name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    
    try {
      const result = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName || null,
        is_hotel_owner: false // Always set to false for travelers
      });
      
      if (result && result.error) {
        toast({
          title: "Registration Error",
          description: result.error,
          variant: "destructive"
        });
      } else if (result && result.success) {
        toast({
          title: "Registration Successful",
          description: "You can now log in with your credentials"
        });
        navigate('/login');
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Registration Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };
  
  const toggleShowPassword = () => setShowPassword(!showPassword);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <AuthCard 
            title="Create Traveler Account" 
            subtitle="Join Hotel-Living and discover themed stays"
            footerLinks={[
              {
                text: "Already have an account?",
                linkText: "Sign in",
                linkUrl: "/login"
              },
              {
                text: "Are you a hotel owner?",
                linkText: "Register as a Hotel Partner",
                linkUrl: "/hotel-signup"
              }
            ]}
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              <InputField
                id="name"
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                Icon={User}
              />
              
              <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                Icon={Mail}
              />
              
              <PasswordField
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
                showValidation
              />
              
              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
                showValidation
              />
              
              <TermsCheckbox
                id="terms"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                label={
                  <>
                    I agree to the{" "}
                    <Link to="/terms" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Privacy Policy
                    </Link>
                  </>
                }
              />
              
              <SubmitButton
                isLoading={isLoading}
                loadingText="Creating account..."
                text="Create Traveler Account"
              />
            </form>
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
