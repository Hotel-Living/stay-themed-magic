import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPromoter() {
  return (
    <AuthLayout 
      title="Create Promoter Account" 
      subtitle="Become a Hotel-Living promoter and earn commissions"
    >
      <SignupForm role="promoter" />
    </AuthLayout>
  );
}