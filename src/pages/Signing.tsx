import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Signing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();
  
  // Sign In State
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signInData.email || !signInData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn(signInData.email, signInData.password, 'traveler');
      
      if (result.success) {
        // Redirect will be handled by the auth context
        toast({
          title: "Success",
          description: "Signed in successfully!"
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Invalid email or password"
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during sign in"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields"
      });
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match"
      });
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long"
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Starting signup process...");
      
      // Enhanced error handling and account existence check
      const result = await signUp(signUpData.email, signUpData.password, {
        first_name: signUpData.firstName,
        last_name: signUpData.lastName
      });
      
      console.log("Signup result:", result);
      
      if (result.success) {
        // Clear loading state immediately before navigation to prevent UI freeze
        setIsLoading(false);
        
        toast({
          title: "Success",
          description: "Account created successfully!"
        });
        
        // Use setTimeout to ensure state is cleared before navigation
        setTimeout(() => {
          console.log("Navigating to register-role...");
          navigate('/register-role');
        }, 100);
      } else {
        setIsLoading(false);
        
        // Handle specific error cases
        if (result.error?.includes("already exists") || 
            result.error?.includes("already registered") ||
            result.error?.includes("User already registered")) {
          toast({
            variant: "destructive",
            title: "Account Already Exists",
            description: "An account with this email already exists. Please try logging in instead."
          });
        } else if (result.error?.includes("Invalid")) {
          toast({
            variant: "destructive",
            title: "Invalid Information",
            description: "Please check your email and password format."
          });
        } else {
          toast({
            variant: "destructive",
            title: "Registration Failed",
            description: result.error || "Failed to create account. Please try again."
          });
        }
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setIsLoading(false);
      
      // Handle network or unexpected errors
      if (error.message?.includes("fetch")) {
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Please check your internet connection and try again."
        });
      } else {
        toast({
          variant: "destructive",
          title: "Unexpected Error",
          description: "An unexpected error occurred. Please try again in a moment."
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to Hotel Living
            </h1>
            <p className="text-white/80 mb-8">
              Sign in to your account or create a new one
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signInData.email}
                        onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-white">First Name</Label>
                      <Input
                        id="first-name"
                        type="text"
                        placeholder="First name"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-white">Last Name</Label>
                      <Input
                        id="last-name"
                        type="text"
                        placeholder="Last name"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}