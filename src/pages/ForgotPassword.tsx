
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuthCard } from "@/components/auth/AuthCard";
import { InputField } from "@/components/auth/InputField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { supabase } from "@/integrations/supabase/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Use the current window origin for the redirect URL
      const redirectUrl = `${window.location.origin}/reset-password`;
      
      // Use Supabase password reset functionality
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        throw error;
      }
      
      setIsSubmitted(true);
      toast({
        title: "Email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred during password reset request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <AuthCard 
            title="Reset Password" 
            subtitle={isSubmitted ? "Check your email" : "Enter your email to receive a password reset link"}
            footerLinks={[
              {
                text: "Remember your password?",
                linkText: "Back to Sign In",
                linkUrl: "/login"
              }
            ]}
          >
            {isSubmitted ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  We've sent a password reset link to <span className="font-medium text-white">{email}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Don't see it? Check your spam folder or 
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition ml-1"
                  >
                    try again
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  Icon={Mail}
                />
                
                <SubmitButton
                  isLoading={isLoading}
                  loadingText="Sending..."
                  text="Send Reset Link"
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
