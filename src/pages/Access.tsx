import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Add auth state change listener for proper session management
  useEffect(() => {
    console.log('🔧 Access: Setting up auth state listener');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔧 Access: Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('🔧 Access: User signed in successfully:', session.user.email);
        } else if (event === 'SIGNED_OUT') {
          console.log('🔧 Access: User signed out');
        }
      }
    );

    return () => {
      console.log('🔧 Access: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  // Helper function to reset form state
  const resetFormState = () => {
    console.log('🔧 Access: Resetting form state');
    setIsLoading(false);
    setPassword('');
    setConfirmPassword('');
  };

  // Form validation
  const isFormValid = () => {
    if (isLogin) {
      return email.trim() && password;
    } else {
      return firstName.trim() && lastName.trim() && email.trim() && password && 
             confirmPassword && password === confirmPassword;
    }
  };

  const getPasswordError = () => {
    if (!isLogin && password && confirmPassword && password !== confirmPassword) {
      return t('passwordsDoNotMatch');
    }
    return null;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔧 Access: Starting auth process, isLogin:', isLogin);
    
    if (!isFormValid()) {
      console.log('🔧 Access: Form validation failed');
      toast({
        title: t('requiredFields'),
        description: isLogin ? t('enterEmailAndPassword') : t('fillAllFields'),
        variant: 'destructive'
      });
      return;
    }

    const passwordError = getPasswordError();
    if (passwordError) {
      console.log('🔧 Access: Password validation error:', passwordError);
      toast({
        title: t('error'),
        description: passwordError,
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        console.log('🔧 Access: Starting login for:', email.trim());
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });

        if (error) {
          console.log('🔧 Access: Login error:', error.message);
          resetFormState();
          
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
          console.log('🔧 Access: Login successful for user:', data.user.email);
          
          // Get user profile to determine redirect
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role, is_hotel_owner')
            .eq('id', data.user.id)
            .single();

          if (profileError) {
            console.log('🔧 Access: Profile fetch error:', profileError.message);
          } else {
            console.log('🔧 Access: Profile found:', profile);
          }

          // Redirect based on role
          if (profile) {
            const userRole = profile.role;
            console.log('🔧 Access: Redirecting user with role:', userRole);
            
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
            console.log('🔧 Access: No profile found, redirecting to user dashboard');
            navigate('/user-dashboard');
          }

          toast({
            title: 'Success',
            description: 'Logged in successfully'
          });
        }
      } else {
        console.log('🔧 Access: Starting signup process for:', email.trim());
        
        // FIXED: Direct signup attempt instead of broken user existence check
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/access`,
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim()
            }
          }
        });

        if (error) {
          console.log('🔧 Access: Signup error:', error.message);
          resetFormState();
          
          if (error.message.includes('already registered') || error.message.includes('already been registered')) {
            console.log('🔧 Access: User already exists, switching to login');
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
          console.log('🔧 Access: Signup successful for user:', data.user.email);
          console.log('🔧 Access: User metadata sent:', { first_name: firstName.trim(), last_name: lastName.trim() });
          
          // Verify profile was created by the trigger
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name, role')
            .eq('id', data.user.id)
            .single();
            
          if (profileError) {
            console.log('🔧 Access: Profile creation failed, trigger may not be working:', profileError.message);
            
            // Fallback: Create profile manually if trigger failed
            const { error: createError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                role: 'guest',
                email_verified: true,
                is_hotel_owner: false
              });
              
            if (createError) {
              console.log('🔧 Access: Manual profile creation failed:', createError.message);
            } else {
              console.log('🔧 Access: Manual profile creation successful');
            }
          } else {
            console.log('🔧 Access: Profile created by trigger:', profile);
          }

          // Start async email processes without blocking (with proper timeout)
          console.log('🔧 Access: Starting background email processes');
          
          setTimeout(() => {
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
              console.log('🔧 Access: Welcome email notification timeout - continuing');
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
              console.log('🔧 Access: Admin notification timeout - continuing');
            });
          }, 0); // Defer to next tick

          console.log('🔧 Access: Moving to role selection step');
          setStep('role-selection');
          toast({
            title: t('accountCreated'),
            description: 'Please select your role to continue'
          });
        }
      }
    } catch (error: any) {
      console.log('🔧 Access: Unexpected error in auth process:', error);
      resetFormState();
      
      toast({
        title: t('unexpectedLoginError'),
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      console.log('🔧 Access: No role selected');
      return;
    }

    console.log('🔧 Access: Starting role selection for:', selectedRole);
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('🔧 Access: No user found in role selection');
        return;
      }

      console.log('🔧 Access: User found for role selection:', user.email);

      // Update profile with selected role
      const roleMapping = {
        user: 'guest',
        hotel: 'hotel_owner',
        association: 'association',
        promoter: 'promoter',
        admin: 'admin'
      };

      const mappedRole = roleMapping[selectedRole];
      console.log('🔧 Access: Updating profile with role:', mappedRole);

      const { error } = await supabase
        .from('profiles')
        .update({
          role: mappedRole,
          is_hotel_owner: selectedRole === 'hotel'
        })
        .eq('id', user.id);

      if (error) {
        console.log('🔧 Access: Profile update error:', error.message);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        });
        return;
      }

      console.log('🔧 Access: Profile updated successfully');

      // Insert user role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          email: user.email,
          role: mappedRole
        });

      if (roleError) {
        console.log('🔧 Access: User role insertion error (may be duplicate):', roleError.message);
        // Don't fail on duplicate role error - it's expected
      } else {
        console.log('🔧 Access: User role inserted successfully');
      }

      console.log('🔧 Access: Redirecting based on role:', selectedRole);

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
      console.log('🔧 Access: Role selection error:', error);
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
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-white">
                        {t('firstName')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={t('enterFirstName')}
                          className="w-full rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-white">
                        {t('lastName')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={t('enterLastName')}
                          className="w-full rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

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

              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                    {t('confirmPassword')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('confirmYourPassword')}
                      className={`w-full rounded-lg py-2 pl-10 pr-12 text-white placeholder-white/60 bg-white/10 border transition-colors ${
                        getPasswordError() ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-white/30'
                      } focus:ring-0`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {getPasswordError() && (
                    <p className="text-red-400 text-xs mt-1">{getPasswordError()}</p>
                  )}
                </div>
              )}

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