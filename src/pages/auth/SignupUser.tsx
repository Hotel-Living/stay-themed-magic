import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupUser() {
  return (
    <AuthLayout 
      title="Create User Account" 
      subtitle="Join Hotel-Living as a traveler and discover unique themed stays"
    >
      <SignupForm role="user" />
    </AuthLayout>
  );
}