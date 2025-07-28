import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { DASHBOARD_ROUTES } from '@/constants/routes';
import { useToastNotifications } from '@/hooks/useToastNotifications';
import { useAutoFocus } from '@/hooks/useAutoFocus';
import { isAdminTestEmail, updateAdminTestRole } from '@/utils/adminRoleSwitching';

interface LoginFormProps {
  role: 'user' | 'hotel' | 'association' | 'promoter';
}

export function LoginForm({ role }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showSuccess, showError } = useToastNotifications();
  const { user } = useAuth();
  
  // Auto-focus enhancement
  const formRef = useAutoFocus({ enabled: true, delay: 200 });

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      switch(role) {
        case 'user': 
          navigate(DASHBOARD_ROUTES.USER);
          break;
        case 'hotel': 
          navigate(DASHBOARD_ROUTES.HOTEL);
          break;
        case 'association': 
          navigate(DASHBOARD_ROUTES.ASSOCIATION);
          break;
        case 'promoter': 
          navigate(DASHBOARD_ROUTES.PROMOTER);
          break;
        default:
          navigate('/');
      }
    }
  }, [user, role, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.error('Login error:', error);
        let errorMessage = error.message;
        
        // Provide more specific error messages
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before logging in.';
        }
        
        toast({
          title: "Login Error",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        // Check if this is the admin test email and update role accordingly
        if (isAdminTestEmail(formData.email)) {
          const roleUpdateSuccess = await updateAdminTestRole(data.user.id, role);
          if (roleUpdateSuccess) {
            showSuccess("Login Successful!", `Welcome back! Role switched to ${getRoleDisplayName()}`);
          } else {
            showSuccess("Login Successful!", "Welcome back!");
          }
        } else {
          showSuccess("Login Successful!", "Welcome back!");
        }
        
        // Redirect based on role
        switch(role) {
          case 'user': 
            navigate(DASHBOARD_ROUTES.USER);
            break;
          case 'hotel': 
            navigate(DASHBOARD_ROUTES.HOTEL);
            break;
          case 'association': 
            navigate(DASHBOARD_ROUTES.ASSOCIATION);
            break;
          case 'promoter': 
            navigate(DASHBOARD_ROUTES.PROMOTER);
            break;
          default:
            navigate('/');
        }
      }
    } catch (error: any) {
      showError("Login Error", error.message || "An unexpected error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleDisplayName = () => {
    switch (role) {
      case 'user': return 'User';
      case 'hotel': return 'Hotel Partner';
      case 'association': return 'Association';
      case 'promoter': return 'Promoter';
      default: return 'User';
    }
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="space-y-4 sm:space-y-6"
      role="form"
      aria-label={`${getRoleDisplayName()} login form`}
      noValidate
    >
      <div>
        <Label htmlFor="email" className="text-black text-sm sm:text-base">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange}
          className="bg-white text-black border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6]"
          aria-describedby="email-help"
          aria-invalid={false}
        />
        <div id="email-help" className="sr-only">
          Enter your email address to sign in
        </div>
      </div>
      
      <div>
        <Label htmlFor="password" className="text-black text-sm sm:text-base">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={formData.password}
          onChange={handleInputChange}
          className="bg-white text-black border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6]"
          aria-describedby="password-help"
          aria-invalid={false}
        />
        <div id="password-help" className="sr-only">
          Enter your password to sign in
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#7E26A6] hover:bg-[#5D0080] text-white font-bold py-2 sm:py-3 rounded-lg shadow-[0_0_15px_rgba(126,38,166,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(126,38,166,0.5)] text-sm sm:text-base"
        disabled={isLoading}
        aria-busy={isLoading}
        aria-describedby="login-status"
      >
        {isLoading ? 'Signing In...' : `Sign In as ${getRoleDisplayName()}`}
      </Button>
      
      <div id="login-status" className="sr-only" aria-live="polite">
        {isLoading ? 'Signing in, please wait...' : ''}
      </div>
      
      {/* Role switching notice for admin test email */}
      {isAdminTestEmail(formData.email) && (
        <div className="text-center text-xs text-blue-600 bg-blue-50 p-2 rounded border">
          🔧 Admin Testing Mode: Logging in as {getRoleDisplayName()}
        </div>
      )}

      <p className="text-center text-xs sm:text-sm text-gray-600">
        Don't have an account?{' '}
        <a 
          href={`/signup/${role}`} 
          className="text-[#7E26A6] hover:underline"
          aria-label={`Create a new ${getRoleDisplayName().toLowerCase()} account`}
        >
          Create one here
        </a>
      </p>
    </form>
  );
}