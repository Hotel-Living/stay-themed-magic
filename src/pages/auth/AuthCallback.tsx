import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const role = searchParams.get('role') || 'user';

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback from email confirmation
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive"
          });
          navigate('/');
          return;
        }

        if (data.session?.user) {
          // User is confirmed and logged in
          toast({
            title: "Email Confirmed!",
            description: "Welcome to Hotel-Living! Redirecting to your dashboard...",
          });

          // Small delay to show the toast, then redirect based on role
          setTimeout(() => {
            switch(role) {
              case 'user': 
                navigate('/user-dashboard');
                break;
              case 'hotel': 
                navigate('/hotel-dashboard');
                break;
              case 'association': 
                navigate('/association-dashboard');
                break;
              case 'promoter': 
                navigate('/promoter-dashboard');
                break;
              default:
                navigate('/');
            }
          }, 1500);
        } else {
          // No session found, user needs to log in
          toast({
            title: "Email Confirmed!",
            description: "Your email has been confirmed. Please log in to access your dashboard.",
          });
          
          // Redirect to the appropriate login page based on role
          setTimeout(() => {
            switch(role) {
              case 'hotel': 
                navigate('/login/hotel');
                break;
              case 'association': 
                navigate('/login/association');
                break;
              case 'promoter': 
                navigate('/login/promoter');
                break;
              default:
                navigate('/login');
            }
          }, 2000);
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast({
          title: "Confirmation Error",
          description: "There was an issue confirming your email. Please try logging in.",
          variant: "destructive"
        });
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate, role, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7E26A6] mx-auto mb-4"></div>
        <p>Confirming your email and setting up your account...</p>
      </div>
    </div>
  );
}