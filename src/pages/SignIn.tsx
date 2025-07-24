import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthCard } from "@/components/auth/AuthCard";
import { ClerkLoginForm } from "@/components/auth/ClerkLoginForm";
import { Starfield } from "@/components/Starfield";
import { useTranslation } from "@/hooks/useTranslation";

export default function SignIn() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { t, isReady } = useTranslation('auth');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Default redirect to user dashboard for authenticated users
      navigate('/user-dashboard');
    }
  }, [user, navigate]);

  // Show loading until i18n is ready
  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col">
        <Starfield />
        <Navbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-lg mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              {t('loginTitle') || 'Sign In'}
            </h1>
          </div>
          
          <AuthCard 
            title="Sign In" 
            subtitle={t('signInToAccount')} 
            footerLinks={[{
              text: t('dontHaveAccount'),
              linkText: t('createTravelerAccountLink'),
              linkUrl: "/signup"
            }]}
          >
            <ClerkLoginForm userType="traveler" />
          </AuthCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}