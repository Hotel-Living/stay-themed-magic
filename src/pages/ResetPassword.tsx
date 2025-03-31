
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuthCard } from "@/components/auth/AuthCard";
import { PasswordField } from "@/components/auth/PasswordField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { supabase } from "@/integrations/supabase/client";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidLink, setIsValidLink] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify we have the hash fragment that indicates a valid reset link
    const hash = window.location.hash;
    if (!hash || !hash.includes('type=recovery')) {
      setIsValidLink(false);
      toast({
        title: "Invalid Link",
        description: "This password reset link is invalid or expired",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please enter and confirm your new password",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Update the password using Supabase
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Your password has been reset successfully",
      });
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Password update error:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred during password reset",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <AuthCard 
            title="Create New Password" 
            subtitle="Enter your new password below"
            footerLinks={[
              {
                text: "Remember your password?",
                linkText: "Back to Sign In",
                linkUrl: "/login"
              }
            ]}
          >
            {!isValidLink ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  This password reset link is invalid or has expired.
                </p>
                <p className="text-xs text-muted-foreground">
                  Please request a new password reset link from the 
                  <a 
                    href="/forgot-password"
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition ml-1"
                  >
                    forgot password page
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <PasswordField
                  id="password"
                  label="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new password"
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                />
                
                <PasswordField
                  id="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  showPassword={showConfirmPassword}
                  toggleShowPassword={toggleShowConfirmPassword}
                />
                
                <SubmitButton
                  isLoading={isLoading}
                  loadingText="Updating..."
                  text="Reset Password"
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
