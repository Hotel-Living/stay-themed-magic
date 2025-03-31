
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eye, EyeOff, Lock, Mail, Building } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuthCard } from "@/components/auth/AuthCard";
import { InputField } from "@/components/auth/InputField";
import { PasswordField } from "@/components/auth/PasswordField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { useToast } from "@/hooks/use-toast";

export default function HotelLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa todos los campos",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Hotel owner login attempt with:", email);
    await signIn(email, password);
    // Redirection is handled in AuthContext after profile is fetched
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <AuthCard 
            title="Hotel Partner Login" 
            subtitle="Sign in to manage your properties"
            footerLinks={[
              {
                text: "Don't have a hotel partner account?",
                linkText: "Register as a Hotel Partner",
                linkUrl: "/hotel-signup"
              },
              {
                text: "Are you a traveler?",
                linkText: "Go to Traveler Login",
                linkUrl: "/login"
              }
            ]}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-fuchsia-900/30 rounded-full">
                <Building className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
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
                placeholder="Enter your password"
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-3 h-3 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-xs text-muted-foreground">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition">
                  Forgot password?
                </Link>
              </div>
              
              <SubmitButton
                isLoading={isLoading}
                loadingText="Signing in..."
                text="Sign In as Hotel Partner"
              />
            </form>
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
