import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

type Step = 'auth' | 'role-selection';
type Role = 'user' | 'hotel' | 'association' | 'promoter';

export default function Access() {
  const { t } = useTranslation('auth');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Core state
  const [step, setStep] = useState<Step>('auth');
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Role selection
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Setup auth listener for existing sessions
  useEffect(() => {
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // User is already logged in, redirect them
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        redirectUserByRole(profile?.role || 'guest');
      }
    };
    
    checkExistingSession();
  }, []);

  // Helper functions
  const clearAllState = () => {
    setIsLoading(false);
    setPassword('');
    setConfirmPassword('');
  };

  const redirectUserByRole = (role: string) => {
    switch (role) {
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
  };

  const isFormValid = () => {
    if (isLogin) {
      return email.trim() && password;
    } else {
      return firstName.trim() && lastName.trim() && email.trim() && 
             password && confirmPassword && password === confirmPassword;
    }
  };

  // Auth handlers
  const handleLogin = async () => {
    console.log('🔧 Starting login for:', email.trim());
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      console.log('🔧 Login error:', error.message);
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
      return false;
    }

    if (data.user) {
      console.log('🔧 Login successful:', data.user.email);
      
      // Get user role and redirect
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      toast({
        title: 'Success',
        description: 'Logged in successfully'
      });

      redirectUserByRole(profile?.role || 'guest');
      return true;
    }
    
    return false;
  };

  const handleSignup = async () => {
    console.log('🔧 Starting signup for:', email.trim());
    
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
      console.log('🔧 Signup error:', error.message);
      
      if (error.message.includes('already registered') || error.message.includes('already been registered')) {
        setIsLogin(true);
        toast({
          title: t('accountExists'),
          description: t('switchToLogin'),
          variant: 'default'
        });
        return false;
      }
      
      toast({
        title: 'Signup Error',
        description: error.message,
        variant: 'destructive'
      });
      return false;
    }

    if (data.user) {
      console.log('🔧 Signup successful:', data.user.email);
      
      // Start background email processes (non-blocking)
      setTimeout(() => {
        supabase.functions.invoke('send-welcome-email', {
          body: { user_id: data.user.id, email: data.user.email }
        }).catch(() => console.log('🔧 Welcome email timeout - continuing'));
        
        supabase.functions.invoke('notify-admin-registration', {
          body: { user_id: data.user.id, email: data.user.email }
        }).catch(() => console.log('🔧 Admin notification timeout - continuing'));
      }, 0);

      toast({
        title: t('accountCreated'),
        description: 'Please select your role to continue'
      });
      
      setStep('role-selection');
      return true;
    }
    
    return false;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: t('requiredFields'),
        description: isLogin ? t('enterEmailAndPassword') : t('fillAllFields'),
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = isLogin ? await handleLogin() : await handleSignup();
      if (!success) {
        clearAllState();
      }
    } catch (error: any) {
      console.log('🔧 Unexpected auth error:', error);
      clearAllState();
      toast({
        title: t('unexpectedLoginError'),
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive'
      });
    }
  };

  const handleRoleSelection = async () => {
    if (!selectedRole) return;

    console.log('🔧 Starting role selection:', selectedRole);
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('No user found');
      }

      const roleMapping = {
        user: 'guest',
        hotel: 'hotel_owner',
        association: 'association',
        promoter: 'promoter'
      };

      const mappedRole = roleMapping[selectedRole];
      
      // Update profile with selected role
      const { error } = await supabase
        .from('profiles')
        .update({
          role: mappedRole,
          is_hotel_owner: selectedRole === 'hotel'
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Insert user role (ignore duplicates)
      await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          email: user.email,
          role: mappedRole
        });

      toast({
        title: 'Success',
        description: 'Account setup completed'
      });

      redirectUserByRole(mappedRole);
    } catch (error: any) {
      console.log('🔧 Role selection error:', error);
      setIsLoading(false);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  // Role Selection Step
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

  // Auth Step (Login/Signup)
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
                        <User className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white h-5 w-5" />
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={t('firstName')}
                          className="w-full rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-white">
                        {t('lastName')}
                      </label>
                      <div className="relative">
                        <User className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white h-5 w-5" />
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={t('lastName')}
                          className="w-full rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors"
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
                  <Mail className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white h-5 w-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    className="w-full rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  {t('password')}
                </label>
                <div className="relative">
                  <Lock className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white h-5 w-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder')}
                    className="w-full rounded-lg py-2 pl-10 pr-10 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
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
                    <Lock className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white h-5 w-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('confirmPasswordPlaceholder')}
                      className="w-full rounded-lg py-2 pl-10 pr-10 text-white placeholder-white/60 bg-white/10 border border-white/20 focus:border-white/30 focus:ring-0 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-red-400 text-sm">{t('passwordsDoNotMatch')}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !isFormValid()}
                className="w-full py-3 rounded-lg text-white font-medium transition-colors disabled:opacity-70 bg-[#5d0083] hover:bg-[#4a0066]"
              >
                {isLoading ? t('loading') : (isLogin ? t('signIn') : t('createAccount'))}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  clearAllState();
                }}
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                {isLogin ? t('noAccount') : t('haveAccount')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}