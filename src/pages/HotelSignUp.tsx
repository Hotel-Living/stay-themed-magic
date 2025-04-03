
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Building, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { InputField } from "@/components/auth/InputField";
import { PasswordField } from "@/components/auth/PasswordField";
import { TermsCheckbox } from "@/components/auth/TermsCheckbox";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { useToast } from "@/hooks/use-toast";

export default function HotelSignUp() {
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
      toast({
        title: "Error",
        description: "Please fill in all fields",
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
      const result = await signUp(email, password, {
        first_name: hotelName,
        last_name: null,
        is_hotel_owner: true // Set to true for hotel owners
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
        navigate('/hotel-login');
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
            title="Register as Hotel Partner" 
            subtitle="Join Hotel-Living and list your property"
            footerLinks={[
              {
                text: "Already have an account?",
                linkText: "Sign in",
                linkUrl: "/hotel-login"
              },
              {
                text: "Looking to book a stay?",
                linkText: "Register as a Traveler",
                linkUrl: "/signup"
              }
            ]}
          >
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
                toggleShowPassword={toggleShowPassword}
              />
              
              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
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
              
              <TermsCheckbox
                id="businessTerms"
                checked={acceptBusinessTerms}
                onChange={() => setAcceptBusinessTerms(!acceptBusinessTerms)}
                label={
                  <>
                    I confirm that I am authorized to list this property and agree to the{" "}
                    <Link to="/hotel-partner-agreement" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Hotel Partner Agreement
                    </Link>
                  </>
                }
              />
              
              <SubmitButton
                isLoading={isLoading}
                loadingText="Creating account..."
                text="Register as Hotel Partner"
              />
            </form>
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
