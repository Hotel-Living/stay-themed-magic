
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { InputField } from "@/components/auth/InputField";
import { PasswordField } from "@/components/auth/PasswordField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    signIn,
    isLoading,
    user
  } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/user-dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Traveler login attempt with:", email);
    try {
      const result = await signIn(email, password);
      if (result.error) {
        toast({
          title: "Error al iniciar sesión",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    }
    // Redirection is now handled in AuthContext after profile is fetched
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <AuthCard 
            title="Traveler Login" 
            subtitle="Sign in to your Hotel-Living account"
            footerLinks={[
              {
                text: "Don't have an account yet?",
                linkText: "Create a traveler account",
                linkUrl: "/signup"
              },
              {
                text: "Are you a hotel owner?",
                linkText: "Sign in as Hotel Partner",
                linkUrl: "/hotel-login"
              }
            ]}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                Icon={Mail}
              />
              
              {/* Password Field */}
              <PasswordField
                id="password"
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
              />
              
              {/* Remember me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" className="w-3 h-3 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500" />
                  <label htmlFor="remember" className="ml-2 text-xs text-muted-foreground">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition">
                  Forgot password?
                </Link>
              </div>
              
              {/* Login Button */}
              <SubmitButton
                isLoading={isLoading}
                loadingText="Signing in..."
                text="Sign In as Traveler"
              />
            </form>
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
