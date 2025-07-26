
import React from "react";
import AuthContext from "./AuthContext";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthMethods } from "./hooks/useAuthMethods";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use custom hooks to manage auth state and methods
  const { 
    user, 
    profile, 
    session, 
    isLoading, 
    isRedirecting,
    setProfile, 
    setIsLoading,
    setUser,
    setSession,
    setIsJustSignedUp
  } = useAuthState();
  
  const { 
    signIn, 
    signOut, 
    updateProfile: updateUserProfile 
  } = useAuthMethods({
    setIsLoading,
    setProfile,
    setUser,
    setSession
  });

  // Wrapper for updateProfile to ensure user is passed
  const updateProfile = async (data: any) => {
    if (user) {
      await updateUserProfile(user, data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isRedirecting,
        signIn,
        signOut,
        updateProfile,
        setIsJustSignedUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
