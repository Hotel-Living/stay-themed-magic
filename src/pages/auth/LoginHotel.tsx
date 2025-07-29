import React, { useEffect } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { supabase } from '@/integrations/supabase/client';

export default function LoginHotel() {
  useEffect(() => {
    // Check for existing session and redirect immediately if found
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log('LoginHotel: Valid session found, redirecting to hotel dashboard');
        window.location.href = '/hotel-dashboard';
      }
    };

    checkSession();
  }, []);

  return (
    <AuthLayout 
      title="Hotel Partner Login" 
      subtitle="Access your Hotel-Living partner dashboard"
    >
      <LoginForm role="hotel" />
    </AuthLayout>
  );
}