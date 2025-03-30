
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Building, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function HotelSignUp() {
  const [hotelName, setHotelName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hotelName || !email || !password || !confirmPassword) {
      return;
    }
    
    if (password !== confirmPassword) {
      return;
    }
    
    await signUp(email, password, {
      first_name: hotelName,
      last_name: null,
      is_hotel_owner: true // Set to true for hotel owners
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <div style={{
            background: 'linear-gradient(-45deg, #AA017A, #65086A)',
            backgroundSize: '200% 200%',
            animation: 'text-shine 2s linear infinite',
          }} className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6 bg-black/60 backdrop-blur-sm">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold mb-1">Register as Hotel Partner</h1>
                <p className="text-muted-foreground text-sm">Join Hotel-Living and list your property</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Hotel Name Field */}
                <div className="space-y-1">
                  <label htmlFor="hotelName" className="text-xs font-medium">
                    Hotel/Property Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <input
                      id="hotelName"
                      type="text"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      className="w-full py-2 pl-9 pr-3 text-sm bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                      placeholder="Enter your hotel or property name"
                    />
                  </div>
                </div>
                
                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-medium">
                    Business Email
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
                      placeholder="Enter your business email"
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
                <div className="flex items-start mt-2">
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
                
                {/* Additional business terms checkbox */}
                <div className="flex items-start mt-2">
                  <div className="flex items-center h-4">
                    <input
                      id="businessTerms"
                      type="checkbox"
                      className="w-3 h-3 bg-secondary/50 border border-border rounded focus:ring-fuchsia-500 focus:border-fuchsia-500"
                      required
                    />
                  </div>
                  <label htmlFor="businessTerms" className="ml-2 text-xs text-muted-foreground">
                    I confirm that I am authorized to list this property and agree to the{" "}
                    <Link to="/terms" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                      Hotel Partner Agreement
                    </Link>
                  </label>
                </div>
                
                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 text-sm rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors disabled:opacity-70 mt-3"
                >
                  {isLoading ? "Creating account..." : "Register as Hotel Partner"}
                </button>
              </form>
              
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                    Sign in
                  </Link>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Looking to book a stay?{" "}
                  <Link to="/signup" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                    Register as a Traveler
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
