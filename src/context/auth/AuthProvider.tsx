
import React from "react";
import AuthContext from "./AuthContext";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthMethods } from "./hooks/useAuthMethods";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("AuthProvider: Rendering started");
  
  try {
    // Use custom hooks to manage auth state and methods
    const { 
      user, 
      profile, 
      session, 
      isLoading, 
      setProfile, 
      setIsLoading,
      setUser,
      setSession
    } = useAuthState();
    
    const { 
      signUp, 
      signIn, 
      signOut, 
      updateProfile: updateUserProfile 
    } = useAuthMethods({ 
      setIsLoading,
      setProfile,
      setUser,
      setSession
    });

    console.log("AuthProvider: Auth state loaded", { user: !!user, isLoading });

    // Show loading spinner during initial auth check
    if (isLoading) {
      console.log("AuthProvider: Still loading auth state");
      return <LoadingSpinner />;
    }

    // Wrapper for updateProfile to ensure user is passed
    const updateProfile = async (data: any) => {
      if (user) {
        await updateUserProfile(user, data);
      }
    };

    console.log("AuthProvider: Rendering children with context");

    return (
      <ErrorBoundary fallback={<div className="min-h-screen flex items-center justify-center"><p>Auth system error. Please refresh.</p></div>}>
        <AuthContext.Provider
          value={{
            user,
            profile,
            session,
            isLoading,
            signUp,
            signIn,
            signOut,
            updateProfile,
          }}
        >
          {children}
        </AuthContext.Provider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("AuthProvider: Critical error", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-xl font-bold text-red-600 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-4">Unable to initialize authentication system.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
};

export default AuthProvider;
