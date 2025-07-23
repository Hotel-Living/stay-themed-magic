import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Shield } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, isReady } = useTranslation('auth');

  // Redirect if already logged in and is admin
  useEffect(() => {
    const checkAdminAndRedirect = async () => {
      if (user) {
        try {
          const { data, error } = await supabase.rpc('has_role', { role_name: 'admin' });
          if (!error && data) {
            // User is already logged in and is admin, redirect to admin panel
            navigate('/panel-fernando/hotels', { replace: true });
          } else {
            // User is logged in but not admin, redirect to regular dashboard
            navigate('/user-dashboard', { replace: true });
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      }
    };

    checkAdminAndRedirect();
  }, [user, navigate]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: t('requiredFields'),
        description: t('enterEmailAndPassword'),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // First, authenticate the user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        toast({
          title: t('authenticationFailed'),
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        // Check if the user has admin role
        const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', { role_name: 'admin' });
        
        if (roleError) {
          console.error("Error checking admin role:", roleError);
          toast({
            title: t('accessVerificationFailed'),
            description: t('unableToVerifyAdmin'),
            variant: "destructive"
          });
          // Sign out the user since we can't verify admin status
          await supabase.auth.signOut();
          return;
        }

        if (!isAdmin) {
          toast({
            title: t('accessDenied'),
            description: t('adminPrivilegesRequired'),
            variant: "destructive"
          });
          // Sign out the user since they're not an admin
          await supabase.auth.signOut();
          return;
        }

        // Success! User is authenticated and has admin role
        toast({
          title: t('adminAccessGranted'),
          description: t('welcomeToAdminPanel'),
        });
        
        // Redirect to admin panel
        navigate('/panel-fernando/hotels', { replace: true });
      }
    } catch (error: any) {
      console.error("Admin login error:", error);
      toast({
        title: t('loginError'),
        description: t('unexpectedLoginError'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      
      <main className="flex-1 pt-16 flex items-center justify-center">
        <div className="container max-w-md mx-auto px-4 py-8">
          <Card className="bg-[#1a0b2e]/90 border-[#8017B0]/30 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-[#8017B0]/20 rounded-full">
                  <Shield className="w-8 h-8 text-[#8017B0]" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                {t('adminAccess')}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {t('adminAccessDescription')}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-white">
                    {t('adminEmail')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('enterAdminEmail')}
                      className="pl-10 bg-[#2a1a3e]/50 border-[#8017B0]/30 text-white placeholder:text-gray-400 focus:border-[#8017B0]"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-white">
                    {t('password')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('enterPassword')}
                      className="pl-10 bg-[#2a1a3e]/50 border-[#8017B0]/30 text-white placeholder:text-gray-400 focus:border-[#8017B0]"
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#8017B0] hover:bg-[#6012a0] text-white font-medium py-3"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      <span>{t('authenticating')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>{t('accessAdminPanel')}</span>
                    </div>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  {t('unauthorizedAccess')} 
                  <br />
                  {t('unauthorizedAccessProhibited')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}