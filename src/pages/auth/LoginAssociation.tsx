import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginAssociation() {
  return (
    <AuthLayout 
      title="Association Login" 
      subtitle="Access your Hotel-Living association dashboard"
    >
      <LoginForm role="association" />
    </AuthLayout>
  );
}