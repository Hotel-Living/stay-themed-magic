
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Building, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<"user" | "hotel">("user");
  const { signUp, isLoading } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      return;
    }
    
    if (password !== confirmPassword) {
      return;
    }
    
    // Divides the name into first and last name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    
    await signUp(email, password, {
      first_name: firstName,
      last_name: lastName || null,
      is_hotel_owner: accountType === "hotel"
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-12">
          <div style={{
            background: 'linear-gradient(-45deg, #860477, #B919B0)',
            backgroundSize: '200% 200%',
            animation: 'text-shine 2s linear infinite',
          }} className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6 bg-black/60 backdrop-blur-sm">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-1">Create Account</h1>
                <p className="text-muted-foreground text-sm">Join Hotel-Living and discover themed stays</p>
              </div>
              
              {/* Account Type Selector */}
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setAccountType("user")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors text-sm ${
                    accountType === "user"
                      ? "bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/50"
                      : "bg-secondary/50 text-foreground/80 border border-border"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Traveler
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("hotel")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors text-sm ${
                    accountType === "hotel"
                      ? "bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-500/50"
                      : "bg-secondary/50 text-foreground/80 border border-border"
                  }`}
                >
                  <Building className="w-4 h-4" />
                  Hotel Owner
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-medium">
                    {accountType === "user" ? "Full Name" : "Hotel Name"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      {accountType === "user" ? (
                        <User className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Building className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full py-2 pl-9 pr-3 text-sm bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                      placeholder={accountType === "user" ? "Enter your full name" : "Enter your hotel name"}
                    />
                  </div>
                </div>
                
                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-2 pl-9 pr-3 text-sm bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-1">
                  <label htmlFor="password" className="text-xs font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-2 pl-9 pr-9 text-sm bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Confirm Password Field */}
                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="text-xs font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full py-2 pl-9 pr-3 text-sm bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
                
                {/* Terms and Conditions */}
                <div className="flex items-start mt-3">
                  <div className="flex items-center h-4">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-3 h-3 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      required
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-xs text-muted-foreground">
                    I agree to the{" "}
                    <Link to="/terms" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 text-sm rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors disabled:opacity-70 mt-4"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
