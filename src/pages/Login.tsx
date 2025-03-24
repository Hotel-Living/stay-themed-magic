
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Starfield } from "@/components/Starfield";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      
      // Basic validation
      if (email === "user@example.com" && password === "password") {
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        });
        navigate("/user-dashboard");
      } else if (email === "hotel@example.com" && password === "password") {
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        });
        navigate("/hotel-dashboard");
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-md mx-auto px-4 py-16">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to your Hotel-Living account</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 pl-11 pr-4 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pl-11 pr-12 bg-secondary/50 border border-border rounded-lg focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Eye className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Forgot Password */}
                <div className="flex justify-end">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-fuchsia-400 hover:text-fuchsia-300 transition"
                  >
                    Forgot password?
                  </Link>
                </div>
                
                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
                
                {/* Demo Accounts */}
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-2">Demo Accounts:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-fuchsia-950/30 rounded-lg">
                      <p>User Account:</p>
                      <p className="text-fuchsia-300">user@example.com</p>
                      <p>password</p>
                    </div>
                    <div className="p-2 bg-fuchsia-950/30 rounded-lg">
                      <p>Hotel Account:</p>
                      <p className="text-fuchsia-300">hotel@example.com</p>
                      <p>password</p>
                    </div>
                  </div>
                </div>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
                    Sign up
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
