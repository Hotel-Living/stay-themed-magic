import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface SignupFormProps {
  role: 'user' | 'hotel' | 'association' | 'promoter';
}

export function SignupForm({ role }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error", 
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);

      const redirectUrl = `${window.location.origin}/auth/callback?role=${role}`;
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: role
          }
        }
      });

      if (error) {
        toast({
          title: "Registration Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Registration Successful!",
          description: "Please check your email for a confirmation link to complete your registration."
        });
        
        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error: any) {
      toast({
        title: "Registration Error",
        description: error.message || "An unexpected error occurred during registration",
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-black">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            className="bg-white text-black border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6]"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-black">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            className="bg-white text-black border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6]"
          />
        </div>
      </div>
      
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
      
      <div>
        <Label htmlFor="confirmPassword" className="text-black">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="bg-white text-black border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6]"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#7E26A6] hover:bg-[#5D0080] text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(126,38,166,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(126,38,166,0.5)]"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : `Create ${getRoleDisplayName()} Account`}
      </Button>
      
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href={`/login/${role}`} className="text-[#7E26A6] hover:underline">
          Sign in here
        </a>
      </p>
    </form>
  );
}