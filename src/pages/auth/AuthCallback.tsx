import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const role = searchParams.get('role') || 'user';
  const confirmed = searchParams.get('confirmed');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for standard Supabase auth tokens first
        const access_token = searchParams.get('access_token');
        const refresh_token = searchParams.get('refresh_token');
        const type = searchParams.get('type');
        
        if (access_token && refresh_token) {
          console.log("Handling standard Supabase auth callback with tokens");
          
          try {
            // Set the session using the tokens from URL
            const { data, error } = await supabase.auth.setSession({
              access_token,
              refresh_token
            });

            if (error) {
              throw error;
            }

            if (data.session?.user) {
              toast({
                title: "Email Confirmed!",
                description: "Welcome to Hotel-Living! Redirecting to your dashboard...",
              });

              setTimeout(() => {
                switch(role) {
                  case 'hotel': 
                    navigate('/hotel-dashboard');
                    break;
                  case 'association': 
                    navigate('/panel-asociacion');
                    break;
                  case 'promoter': 
                    navigate('/promoter-dashboard');
                    break;
                  default:
                    navigate('/user-dashboard');
                }
              }, 1500);
              return;
            }
          } catch (error) {
            console.error("Token session error:", error);
          }
        }
        
        // Check if this is a custom confirmation link (legacy support)
        const token_hash = searchParams.get('token_hash');
        
        if (token_hash && type === 'signup') {
          // This is our custom confirmation flow
          console.log("Handling custom confirmation for user:", token_hash);
          
          try {
            // Call our confirm-user function to verify and log in the user
            const { data: confirmData, error: confirmError } = await supabase.functions.invoke('confirm-user', {
              body: {
                userId: token_hash,
                role: role
              }
            });

            if (confirmError) {
              throw confirmError;
            }

            // If we got a magic link, redirect to it for automatic login
            if (confirmData.redirectUrl) {
              window.location.href = confirmData.redirectUrl;
              return;
            }

            // If no redirect URL, show success and redirect to dashboard
            toast({
              title: "Email Confirmed!",
              description: "Welcome to Hotel-Living! Redirecting to your dashboard...",
            });

            setTimeout(() => {
              switch(role) {
                case 'hotel': 
                  navigate('/hotel-dashboard');
                  break;
                case 'association': 
                  navigate('/panel-asociacion');
                  break;
                case 'promoter': 
                  navigate('/promoter-dashboard');
                  break;
                default:
                  navigate('/user-dashboard');
              }
            }, 1500);
            return;

          } catch (error) {
            console.error("Confirmation error:", error);
            toast({
              title: "Confirmation Error",
              description: "There was an issue confirming your email. Please try logging in manually.",
              variant: "destructive"
            });
            
            // Fallback to login page
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
            return;
          }
        }

        // Handle Supabase email verification callback
        console.log("Checking for email verification callback");
        
        // First try to exchange the URL hash for a session (email verification)
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          toast({
            title: "Authentication Error", 
            description: sessionError.message,
            variant: "destructive"
          });
          navigate('/');
          return;
        }

        if (sessionData.session?.user) {
          // User is successfully logged in after email verification
          console.log("User authenticated after email verification:", sessionData.session.user.email);
          
          toast({
            title: "Email Confirmed!",
            description: "Welcome to Hotel-Living! Redirecting to your dashboard...",
          });

          // Redirect to appropriate dashboard based on role
          setTimeout(() => {
            switch(role) {
              case 'hotel': 
                navigate('/hotel-dashboard');
                break;
              case 'association': 
                navigate('/panel-asociacion');
                break;
              case 'promoter': 
                navigate('/promoter-dashboard');
                break;
              default:
                navigate('/user-dashboard');
            }
          }, 1500);
        } else {
          // No session found - try to handle URL fragments for email confirmation
          console.log("No session found, checking URL parameters");
          
          // Check if we have URL fragments that need to be processed
          const urlFragment = window.location.hash;
          if (urlFragment.includes('access_token') || urlFragment.includes('type=signup')) {
            console.log("Found auth fragments in URL, waiting for auth state change");
            
            // Wait a moment for Supabase to process the URL fragments
            setTimeout(async () => {
              const { data: retrySession } = await supabase.auth.getSession();
              if (retrySession.session?.user) {
                console.log("Session established after retry");
                toast({
                  title: "Email Confirmed!",
                  description: "Welcome to Hotel-Living! Redirecting to your dashboard...",
                });

                setTimeout(() => {
                  switch(role) {
                    case 'hotel': 
                      navigate('/hotel-dashboard');
                      break;
                    case 'association': 
                      navigate('/panel-asociacion');
                      break;
                    case 'promoter': 
                      navigate('/promoter-dashboard');
                      break;
                    default:
                      navigate('/user-dashboard');
                  }
                }, 1500);
              } else {
                // Still no session, redirect to login
                console.log("Still no session after retry, redirecting to login");
                toast({
                  title: "Email Confirmed!",
                  description: "Your email has been confirmed. Please log in to access your dashboard.",
                });
                
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
                      navigate('/login/user');
                  }
                }, 2000);
              }
            }, 1000);
          } else {
            // No auth fragments and no session - redirect to appropriate login
            console.log("No auth data found, redirecting to login");
            toast({
              title: "Email Confirmed!",
              description: "Please log in to access your dashboard.",
            });
            
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
                  navigate('/login/user');
              }
            }, 2000);
          }
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