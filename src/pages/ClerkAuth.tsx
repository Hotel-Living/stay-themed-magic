import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function ClerkAuth() {
  return (
    <>
      <SignedIn>
        <Navigate to="/user-dashboard" replace />
      </SignedIn>
      
      <SignedOut>
        <div className="min-h-screen relative bg-gradient-to-br from-background to-muted">
          <Navbar />
          
          <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Welcome to Hotel Living
                </h1>
                <p className="text-white/80 mb-8">
                  Sign in to access your account or create a new one
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 space-y-4">
                <div className="space-y-4">
                  <SignInButton 
                    mode="modal"
                    fallbackRedirectUrl="/user-dashboard"
                  >
                    <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  
                  <SignUpButton 
                    mode="modal"
                    fallbackRedirectUrl="/user-dashboard"
                  >
                    <button className="w-full bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-4 rounded-lg border border-white/20 transition-colors">
                      Create Account
                    </button>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
      </SignedOut>
    </>
  );
}