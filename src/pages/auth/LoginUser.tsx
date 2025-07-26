import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginUser() {
  return (
    <AuthLayout 
      title="User Login" 
      subtitle="Sign in to your Hotel-Living traveler account"
    >
      <LoginForm role="user" />
    </AuthLayout>
  );
}