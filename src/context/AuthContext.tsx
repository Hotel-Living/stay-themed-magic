
import React, { createContext, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "@/types/auth";
import { useAuthOperations } from "@/hooks/useAuthOperations";
import { useProfileOperations } from "@/hooks/useProfileOperations";
import { Profile } from "@/integrations/supabase/types-custom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, 
    setUser, 
    session, 
    setSession, 
    isLoading, 
    setIsLoading, 
    signUp, 
    signIn, 
    signOut 
  } = useAuthOperations();
  
  const { profile, fetchProfile, updateProfile: updateProfileData } = useProfileOperations();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          await fetchProfile(currentSession.user.id);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession ? "User logged in" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateProfile = async (data: Partial<Profile>) => {
    setIsLoading(true);
    await updateProfileData(user, data);
    setIsLoading(false);
  };

  return (
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
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
