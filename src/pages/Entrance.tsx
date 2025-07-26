import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/hooks/useTranslation";
import { AuthCard } from "@/components/auth/AuthCard";
import { InputField } from "@/components/auth/InputField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { ForgotPasswordLink } from "@/components/auth/ForgotPasswordLink";
import { useLoginForm } from "@/hooks/useLoginForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function Entrance() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // Tab state - remember selection
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(() => {
    return (localStorage.getItem('entrance-tab') as 'login' | 'signup') || 'login';
  });

  // Login form state
  const {
    email: loginEmail,
    setEmail: setLoginEmail,
    password: loginPassword,
    setPassword: setLoginPassword,
    showPassword: showLoginPassword,
    setShowPassword: setShowLoginPassword,
    isLoading: isLoginLoading,
    handleSubmit: handleLoginSubmit
  } = useLoginForm("traveler"); // userType doesn't matter for login, handled by profile

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Remember tab selection
  useEffect(() => {
    localStorage.setItem('entrance-tab', activeTab);
  }, [activeTab]);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && profile) {
      // Redirect based on user role
      const redirectBasedOnRole = () => {
        if (profile.role === 'admin') {
          navigate('/panel-fernando/hotels', { replace: true });
        } else if (profile.role === 'guest') {
          navigate('/user-dashboard', { replace: true });
        } else if (profile.role === 'hotel_owner') {
          navigate('/hotel-dashboard', { replace: true });
        } else if (profile.role === 'association') {
          navigate('/panel-asociacion', { replace: true });
        } else if (profile.role === 'agent') {
          navigate('/panel-agente', { replace: true });
        } else if (profile.role === 'promoter') {
          navigate('/promoter/dashboard', { replace: true });
        } else {
          navigate('/user-dashboard', { replace: true });
        }
      };
      
      redirectBasedOnRole();
    }
  }, [user, profile, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match"
      });
      return;
    }

    setIsSignupLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: signupData.firstName,
            last_name: signupData.lastName
          }
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: error.message
        });
        return;
      }

      // Redirect to role selection
      navigate('/register-role');

      toast({
        title: "Account created successfully!",
        description: "Redirecting to role selection..."
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "An unexpected error occurred"
      });
    } finally {
      setIsSignupLoading(false);
    }
  };

  const updateSignupField = (field: keyof typeof signupData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <AuthCard
            title={activeTab === 'login' ? t('signIn') || 'Sign In' : t('signUp') || 'Sign Up'}
            subtitle={activeTab === 'login' ? t('signInSubtitle') || 'Welcome back' : t('signUpSubtitle') || 'Create your account'}
            footerLinks={[]}
          >
            {/* Tab Navigation */}
            <div className="flex mb-6 rounded-lg bg-white/10 p-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white/90'
                }`}
              >
                {t('alreadyHaveAccount') || 'I already have an account'}
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'signup'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white/90'
                }`}
              >
                {t('newHere') || 'I am new here'}
              </button>
            </div>

            {/* Login Tab */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <InputField
                  id="login-email"
                  label={t('email') || 'Email'}
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder={t('enterEmail') || 'Enter your email'}
                  Icon={Mail}
                />

                <InputField
                  id="login-password"
                  label={t('password') || 'Password'}
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder={t('enterPassword') || 'Enter your password'}
                  Icon={Lock}
                  inputClassName="pr-12"
                />
                
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center top-7">
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex justify-end">
                  <ForgotPasswordLink />
                </div>

                <SubmitButton
                  isLoading={isLoginLoading}
                  loadingText={t('signingIn') || 'Signing in...'}
                  text={t('signIn') || 'Log in'}
                />
              </form>
            )}

            {/* Signup Tab */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <InputField
                  id="firstName"
                  label={t('firstName') || 'First Name'}
                  type="text"
                  value={signupData.firstName}
                  onChange={updateSignupField('firstName')}
                  placeholder={t('enterFirstName') || 'Enter your first name'}
                  Icon={User}
                />

                <InputField
                  id="lastName"
                  label={t('lastName') || 'Last Name'}
                  type="text"
                  value={signupData.lastName}
                  onChange={updateSignupField('lastName')}
                  placeholder={t('enterLastName') || 'Enter your last name'}
                  Icon={User}
                />

                <InputField
                  id="signup-email"
                  label={t('email') || 'Email'}
                  type="email"
                  value={signupData.email}
                  onChange={updateSignupField('email')}
                  placeholder={t('enterEmail') || 'Enter your email'}
                  Icon={Mail}
                />

                <div className="relative">
                  <InputField
                    id="signup-password"
                    label={t('password') || 'Password'}
                    type={showSignupPassword ? "text" : "password"}
                    value={signupData.password}
                    onChange={updateSignupField('password')}
                    placeholder={t('enterPassword') || 'Enter your password'}
                    Icon={Lock}
                    inputClassName="pr-12"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center top-7">
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <InputField
                    id="confirmPassword"
                    label={t('confirmPassword') || 'Confirm Password'}
                    type={showConfirmPassword ? "text" : "password"}
                    value={signupData.confirmPassword}
                    onChange={updateSignupField('confirmPassword')}
                    placeholder={t('confirmYourPassword') || 'Confirm your password'}
                    Icon={Lock}
                    inputClassName="pr-12"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center top-7">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-white hover:text-white/80 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <SubmitButton
                  isLoading={isSignupLoading}
                  loadingText={t('creatingAccount') || 'Creating account...'}
                  text={t('createAccount') || 'Create account'}
                />
              </form>
            )}
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}