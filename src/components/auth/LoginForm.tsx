import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

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
  const { user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      switch(role) {
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
          navigate('/promoter-dashboard');
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
        toast({
          title: "Login Successful!",
          description: "Welcome back!"
        });
        
        // Redirect based on role
        switch(role) {
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
            navigate('/promoter-dashboard');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message || "An unexpected error occurred during login",
        variant: "destructive"
      });
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email" className="text-black">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className="bg-white text-black border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6]"
        />
      </div>
      
      <div>
        <Label htmlFor="password" className="text-black">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleInputChange}
          className="bg-white text-black border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6]"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#7E26A6] hover:bg-[#5D0080] text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(126,38,166,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(126,38,166,0.5)]"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : `Sign In as ${getRoleDisplayName()}`}
      </Button>
      
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href={`/signup/${role}`} className="text-[#7E26A6] hover:underline">
          Create one here
        </a>
      </p>
    </form>
  );
}