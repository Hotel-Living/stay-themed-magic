import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginHotel() {
  return (
    <AuthLayout 
      title="Hotel Partner Login" 
      subtitle="Access your Hotel-Living partner dashboard"
    >
      <LoginForm role="hotel" />
    </AuthLayout>
  );
}