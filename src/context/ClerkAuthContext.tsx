import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

interface ClerkAuthContextType {
  isSignedIn: boolean;
  user: any;
  signOut: () => Promise<void>;
}

const ClerkAuthContext = createContext<ClerkAuthContextType | undefined>(undefined);

export const ClerkAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerkAuth();

  const value = {
    isSignedIn: !!isSignedIn,
    user,
    signOut,
  };

  return (
    <ClerkAuthContext.Provider value={value}>
      {children}
    </ClerkAuthContext.Provider>
  );
};

export const useClerkAuthContext = () => {
  const context = useContext(ClerkAuthContext);
  if (context === undefined) {
    throw new Error('useClerkAuthContext must be used within a ClerkAuthProvider');
  }
  return context;
};