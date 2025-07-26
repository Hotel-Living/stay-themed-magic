import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

type Step = 'auth' | 'role-selection' | 'verify-email';
type Role = 'user' | 'hotel' | 'association' | 'promoter' | 'admin';

export default function Access() {
  const { t } = useTranslation('auth');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<Step>('auth');
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: t('requiredFields'),
        description: t('enterEmailAndPassword'),
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: t('invalidCredentials'),
              description: 'Please check your email and password',
              variant: 'destructive'
            });
          } else {
            toast({
              title: t('loginError'),
              description: error.message,
              variant: 'destructive'
            });
          }
          return;
        }

        if (data.user) {
          // Get user profile to determine redirect
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, is_hotel_owner')
            .eq('id', data.user.id)
            .single();

          // Redirect based on role
          if (profile) {
            const userRole = profile.role;
            switch (userRole) {
              case 'guest':
                navigate('/user-dashboard');
                break;
              case 'hotel_owner':
                navigate('/hotel-dashboard');
                break;
              case 'association':
                navigate('/panel-asociacion');
                break;
              case 'promoter':
                navigate('/promoter/dashboard');
                break;
              case 'admin':
                navigate('/panel-fernando');
                break;
              default:
                navigate('/user-dashboard');
            }
          } else {
            navigate('/user-dashboard');
          }

          toast({
            title: 'Success',
            description: 'Logged in successfully'
          });
        }
      } else {
        // Signup flow - check if user exists first
        const { data: existingUser } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: 'dummy' // This will fail but tell us if user exists
        });

        // If we get here without error, something went wrong
        if (!existingUser) {
          // User doesn't exist, proceed with signup
          const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/access`
            }
          });

          if (error) {
            if (error.message.includes('already registered')) {
              setIsLogin(true);
              toast({
                title: t('accountExists'),
                description: t('switchToLogin'),
                variant: 'default'
              });
              return;
            }
            toast({
              title: 'Signup Error',
              description: error.message,
              variant: 'destructive'
            });
            return;
          }

          if (data.user) {
            // Start async email processes without blocking
            Promise.race([
              fetch('https://pgdzrvdwgoomjnnegkcn.supabase.co/functions/v1/send-welcome-email', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHpydmR3Z29vbWpubmVna2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mjk0NzIsImV4cCI6MjA1ODQwNTQ3Mn0.VWcjjovrdsV7czPVaYJ219GzycoeYisMUpPhyHkvRZ0`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: data.user.id, email: data.user.email })
              }),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
            ]).catch(() => {
              console.log('Email notification timeout - continuing with signup');
            });

            Promise.race([
              fetch('https://pgdzrvdwgoomjnnegkcn.supabase.co/functions/v1/notify-admin-registration', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZHpydmR3Z29vbWpubmVna2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Mjk0NzIsImV4cCI6MjA1ODQwNTQ3Mn0.VWcjjovrdsV7czPVaYJ219GzycoeYisMUpPhyHkvRZ0`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: data.user.id, email: data.user.email })
              }),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
            ]).catch(() => {
              console.log('Admin notification timeout - continuing with signup');
            });

            setStep('role-selection');
            toast({
              title: t('accountCreated'),
              description: 'Please select your role to continue'
            });
          }
        }
      }
    } catch (error: any) {
      // Handle case where user exists
      if (error.message && error.message.includes('Invalid login credentials')) {
        // User exists, switch to login
        setIsLogin(true);
        toast({
          title: t('accountExists'),
          description: t('loginInstead'),
          variant: 'default'
        });
      } else {
        toast({
          title: t('unexpectedLoginError'),
          description: error.message || 'An unexpected error occurred',
          variant: 'destructive'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = async () => {
    if (!selectedRole) return;

    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update profile with selected role
      const roleMapping = {
        user: 'guest',
        hotel: 'hotel_owner',
        association: 'association',
        promoter: 'promoter',
        admin: 'admin'
      };

      const { error } = await supabase
        .from('profiles')
        .update({
          role: roleMapping[selectedRole],
          is_hotel_owner: selectedRole === 'hotel'
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
        return;
      }

      // Insert user role
      await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          email: user.email,
          role: roleMapping[selectedRole]
        });

      // Redirect based on role
      switch (selectedRole) {
        case 'user':
          navigate('/user-dashboard');
          break;
        case 'hotel':
          navigate('/hotel-dashboard');
          break;
        case 'association':
          navigate('/panel-asociacion');
          break;
        case 'promoter':
          navigate('/promoter/dashboard');
          break;
        case 'admin':
          navigate('/panel-fernando');
          break;
      }

      toast({
        title: 'Success',
        description: 'Account setup completed'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'role-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl overflow-hidden bg-[#7E00B3]/90 shadow-[0_0_60px_rgba(0,200,255,0.8),0_0_120px_rgba(0,200,255,0.4),0_0_180px_rgba(0,200,255,0.2)]">
            <div className="p-6 backdrop-blur-sm">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white mb-2">{t('selectRole')}</h1>
                <p className="text-white/80 text-sm">{t('selectYourRole')}</p>
              </div>

              <div className="space-y-3">
                {(['user', 'hotel', 'association', 'promoter'] as Role[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full p-4 rounded-lg border text-left transition-colors ${
                      selectedRole === role
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/15'
                    }`}
                  >
                    <div className="font-medium">{t(role)}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleRoleSelection}
                disabled={!selectedRole || isLoading}
                className="w-full py-3 mt-6 rounded-lg text-white font-medium transition-colors disabled:opacity-70 bg-[#5d0083] hover:bg-[#4a0066]"
              >
                {isLoading ? t('loading') : t('continue')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-2xl overflow-hidden bg-[#7E00B3]/90 shadow-[0_0_60px_rgba(0,200,255,0.8),0_0_120px_rgba(0,200,255,0.4),0_0_180px_rgba(0,200,255,0.2)]">
          <div className="p-6 backdrop-blur-sm">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">{t('accessTitle')}</h1>
              <p className="text-white/80 text-sm">
                {isLogin ? t('signInToAccount') : t('joinHotelLiving')}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  {t('email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('enterEmail')}
                    className="w-full rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  {t('password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isLogin ? t('enterPassword') : t('createPassword')}
                    className="w-full rounded-lg py-2 pl-10 pr-12 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg text-white font-medium transition-colors disabled:opacity-70 bg-[#5d0083] hover:bg-[#4a0066]"
              >
                {isLoading 
                  ? (isLogin ? t('signingIn') : t('creatingAccount'))
                  : (isLogin ? t('signIn') : t('createAccount'))
                }
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-fuchsia-400 hover:text-fuchsia-300 transition text-sm"
              >
                {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}{' '}
                {isLogin ? t('createAccount') : t('signIn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}