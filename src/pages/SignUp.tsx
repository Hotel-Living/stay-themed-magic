
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
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  
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
        is_hotel_owner: false
      });
      
      if (result && result.error) {
        // Check if it's the email confirmation message
        if (result.error.includes("check your email")) {
          toast({
            title: "Registration Successful",
            description: "Please check your email for a confirmation link before signing in."
          });
          navigate('/login');
        } else {
          toast({
            title: "Registration Error",
            description: result.error,
            variant: "destructive"
          });
        }
      } else if (result && result.success) {
        toast({
          title: "Registration Successful",
          description: "Please check your email for a confirmation link before signing in."
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
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <AuthCard 
            title={t('auth.createTravelerAccount')} 
            subtitle={t('auth.joinHotelLiving')}
            footerLinks={[
              {
                text: t('auth.alreadyHaveAccount'),
                linkText: t('auth.signIn'),
                linkUrl: "/login"
              },
              {
                text: t('auth.areHotelOwner'),
                linkText: t('auth.registerHotelPartner'),
                linkUrl: "/hotel-signup"
              }
            ]}
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              <InputField
                id="name"
                label={t('auth.fullName')}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('auth.enterFullName')}
                Icon={User}
              />
              
              <InputField
                id="email"
                label={t('auth.email')}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.enterEmail')}
                Icon={Mail}
              />
              
              <PasswordField
                id="password"
                label={t('auth.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.createPassword')}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
                showValidation
              />
              
              <PasswordField
                id="confirmPassword"
                label={t('auth.confirmPassword')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('auth.confirmYourPassword')}
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
                    {t('auth.agreeTerms').split('Terms and Conditions')[0]}
                    <Link to="/terms" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Terms and Conditions
                    </Link>
                    {t('auth.agreeTerms').split('Privacy Policy')[0].split('Terms and Conditions')[1]}
                    <Link to="/privacy" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Privacy Policy
                    </Link>
                  </>
                }
              />
              
              <SubmitButton
                isLoading={isLoading}
                loadingText="Creating account..."
                text={t('auth.createTravelerAccount')}
              />
            </form>
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
