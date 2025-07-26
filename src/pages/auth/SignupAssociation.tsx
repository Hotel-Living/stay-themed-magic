import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupAssociation() {
  return (
    <AuthLayout 
      title="Create Association Account" 
      subtitle="Register your hotel association with Hotel-Living"
    >
      <SignupForm role="association" />
    </AuthLayout>
  );
}