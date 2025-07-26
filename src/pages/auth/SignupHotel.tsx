import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupHotel() {
  return (
    <AuthLayout 
      title="Create Hotel Partner Account" 
      subtitle="List your property on Hotel-Living and connect with travelers"
    >
      <SignupForm role="hotel" />
    </AuthLayout>
  );
}