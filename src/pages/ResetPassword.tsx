
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { AuthCard } from "@/components/auth/AuthCard";
import { PasswordField } from "@/components/auth/PasswordField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { supabase } from "@/integrations/supabase/client";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    console.log("Token from URL:", tokenParam);
    
    // Clear any existing session to prevent automatic login during password reset
    const clearSessionAndSetToken = async () => {
      try {
        await supabase.auth.signOut();
        console.log("Cleared existing session for password reset");
      } catch (error) {
        console.log("No session to clear or error clearing session:", error);
      }
      
      if (!tokenParam) {
        console.log("No token found in URL");
        setIsValidToken(false);
        toast({
          title: "Invalid Reset Link",
          description: "This password reset link is invalid or has expired. Please request a new one.",
          variant: "destructive",
        });
        return;
      }
      
      setToken(tokenParam);
      setIsValidToken(true);
    };
    
    clearSessionAndSetToken();
  }, [searchParams, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast({
        title: "Error",
        description: "Invalid reset token",
        variant: "destructive",
      });
      return;
    }
    
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
    
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      console.log("Confirming password reset with token:", token);
      
      // Call our custom password confirm edge function
      const { data, error } = await supabase.functions.invoke('custom-password-confirm', {
        body: { 
          token,
          newPassword: password
        }
      });
      
      if (error) {
        console.error("Password confirm error:", error);
        throw new Error(error.message || "Failed to reset password");
      }
      
      console.log("Password reset successful:", data);
      toast({
        title: "Success",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.error("Password reset error:", error);
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
            {isValidToken === null ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-sm text-muted-foreground">
                  Verifying reset link...
                </p>
              </div>
            ) : !isValidToken ? (
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
