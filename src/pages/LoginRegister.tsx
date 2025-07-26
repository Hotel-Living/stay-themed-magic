import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { InputField } from "@/components/auth/InputField";
import { PasswordField } from "@/components/auth/PasswordField";
import { AuthCard } from "@/components/auth/AuthCard";
import { Mail, User, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function LoginRegister() {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  // UI State
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Signup Form State
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  // Login Form State
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate("/user-dashboard");
    }
  }, [user, navigate]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateSignupForm = () => {
    if (!signupData.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!signupData.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!signupData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateLoginForm = () => {
    if (!loginData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!loginData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm()) return;
    
    try {
      setIsLoading(true);
      
      const result = await signUp(
        signupData.email.trim().toLowerCase(),
        signupData.password,
        {
          first_name: signupData.firstName.trim(),
          last_name: signupData.lastName.trim()
        }
      );
      
      if (result.success) {
        toast.success("Account created successfully!");
        // Redirect to role selection for new users
        navigate("/register-role");
      } else {
        toast.error(result.error || "Failed to create account");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    try {
      setIsLoading(true);
      
      const result = await signIn(
        loginData.email.trim().toLowerCase(),
        loginData.password,
        "traveler" // Default user type for login
      );
      
      if (result.success) {
        // Get user profile to determine role-based redirect
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, is_hotel_owner')
          .eq('id', user?.id)
          .single();
        
        toast.success("Logged in successfully!");
        
        // Role-based redirection
        if (profile?.role === 'admin') {
          navigate("/admin");
        } else if (profile?.is_hotel_owner || profile?.role === 'hotel_owner') {
          navigate("/hotel-dashboard");
        } else if (profile?.role === 'association') {
          navigate("/association-dashboard");
        } else if (profile?.role === 'promoter') {
          navigate("/promoter-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        toast.error(result.error || "Failed to log in");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    setSignupData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setLoginData({
      email: "",
      password: ""
    });
    setIsLoading(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowLoginPassword(false);
  };

  const switchMode = () => {
    resetForms();
    setIsSignupMode(!isSignupMode);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md">
          <AuthCard
            title={isSignupMode ? "Create Account" : "Welcome Back"}
            subtitle={isSignupMode ? "Join the community" : "Sign in to your account"}
            footerLinks={[]}
          >
            {isSignupMode ? (
              <form onSubmit={handleSignup} className="space-y-4">
                <InputField
                  id="firstName"
                  label="First Name"
                  type="text"
                  value={signupData.firstName}
                  onChange={(e) => setSignupData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter your first name"
                  Icon={User}
                />
                
                <InputField
                  id="lastName"
                  label="Last Name"
                  type="text"
                  value={signupData.lastName}
                  onChange={(e) => setSignupData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter your last name"
                  Icon={User}
                />
                
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  Icon={Mail}
                />
                
                <PasswordField
                  id="password"
                  label="Password"
                  value={signupData.password}
                  onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Create a password"
                  showPassword={showPassword}
                  toggleShowPassword={() => setShowPassword(!showPassword)}
                />
                
                <PasswordField
                  id="confirmPassword"
                  label="Confirm Password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm your password"
                  showPassword={showConfirmPassword}
                  toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-70 mt-4 bg-[#5d0083] hover:bg-[#4a0066] text-base"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  Icon={Mail}
                />
                
                <PasswordField
                  id="password"
                  label="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  showPassword={showLoginPassword}
                  toggleShowPassword={() => setShowLoginPassword(!showLoginPassword)}
                />
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-70 mt-4 bg-[#5d0083] hover:bg-[#4a0066] text-base"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={switchMode}
                disabled={isLoading}
                className="text-fuchsia-400 hover:text-fuchsia-300 transition text-sm disabled:opacity-70"
              >
                {isSignupMode 
                  ? "Already have an account? Sign in" 
                  : "Don't have an account? Create one"
                }
              </button>
            </div>
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}