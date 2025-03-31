import { useState } from "react";
import { Link } from "react-router-dom";
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
    isLoading
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    console.log("Traveler login attempt with:", email);
    await signIn(email, password);
    // Redirection is now handled in AuthContext after profile is fetched
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <AuthCard>
            <div className="p-8 backdrop-blur-sm bg-[#5d0170]">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-6">Traveler Login</h1>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full py-2 pl-9 pr-3 text-sm bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors" placeholder="Enter your email" />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-xs font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full py-2 pl-9 pr-9 text-sm bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors" placeholder="Enter your password" />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>
                
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
                <SubmitButton type="submit" disabled={isLoading} className="w-full py-2 rounded-lg text-white font-medium text-sm transition-colors disabled:opacity-70 bg-[#860493]">
                  {isLoading ? "Signing in..." : "Sign In as Traveler"}
                </SubmitButton>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Don't have an account yet?{" "}
                  <Link to="/signup" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                    Create a traveler account
                  </Link>
                </p>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Are you a hotel owner?{" "}
                  <Link to="/hotel-login" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                    Sign in as Hotel Partner
                  </Link>
                </p>
              </div>
            </div>
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
