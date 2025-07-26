import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPromoter() {
  return (
    <AuthLayout 
      title="Promoter Login" 
      subtitle="Access your Hotel-Living promoter dashboard"
    >
      <LoginForm role="promoter" />
    </AuthLayout>
  );
}