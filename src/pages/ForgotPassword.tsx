
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
import { useTranslation } from "@/hooks/useTranslation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: t('auth.invalidCredentials'),
        description: t('auth.enterEmail'),
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
        title: t('auth.emailSent'),
        description: t('auth.checkYourEmail'),
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: t('auth.invalidCredentials'),
        description: error.message || t('auth.invalidCredentials'),
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
            title={t('auth.resetPassword')} 
            subtitle={isSubmitted ? t('auth.checkYourEmail') : t('auth.sendResetLink')}
            footerLinks={[
              {
                text: t('auth.rememberPassword'),
                linkText: t('auth.backToSignIn'),
                linkUrl: "/login"
              }
            ]}
          >
            {isSubmitted ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {t('auth.passwordResetSent')} <span className="font-medium text-white">{email}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('auth.dontSeeIt')}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-fuchsia-400 hover:text-fuchsia-300 transition ml-1"
                  >
                    {t('auth.tryAgain')}
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                  id="email"
                  label={t('auth.email')}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.enterEmail')}
                  Icon={Mail}
                />
                
                <SubmitButton
                  isLoading={isLoading}
                  loadingText={t('auth.sending')}
                  text={t('auth.sendResetLink')}
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
