
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail } from "lucide-react";
import { AuthCard } from "@/components/auth/AuthCard";
import { InputField } from "@/components/auth/InputField";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Recovery email sent",
        description: "Check your inbox for password reset instructions",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <AuthCard
            title="Forgot Password"
            subtitle={isSubmitted ? "Check your email" : "Reset your password"}
            footerLinks={[
              {
                text: "Remember your password?",
                linkText: "Back to login",
                linkUrl: "/login"
              }
            ]}
          >
            {isSubmitted ? (
              <div className="text-center p-4">
                <p className="mb-4">
                  We've sent recovery instructions to <strong>{email}</strong>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  If you don't receive an email within a few minutes, check your spam folder or try again.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#860493] hover:bg-fuchsia-700 text-white"
                >
                  Try again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  Icon={Mail}
                />
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 rounded-lg text-white font-medium text-sm transition-colors disabled:opacity-70 bg-[#860493] hover:bg-fuchsia-700"
                >
                  {isSubmitting ? "Sending..." : "Send Recovery Instructions"}
                </Button>
              </form>
            )}
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
