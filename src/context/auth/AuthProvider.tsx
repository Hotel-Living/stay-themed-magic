import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Profile } from "@/integrations/supabase/types-custom";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const isAuthComplete = !!user && !!session && !!profile?.role;

  const signOut = async () => {
    console.log('🚪 Starting logout process...');
    try {
      // Clear local state first
      setUser(null);
      setSession(null);
      setProfile(null);
      console.log('✅ Local state cleared');
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Supabase signOut error:', error);
        throw error;
      }
      console.log('✅ Supabase session cleared');
      
      // Force page reload to clear any cached state
      window.location.replace('/entrance');
      console.log('✅ Redirecting to entrance');
    } catch (error) {
      console.error('❌ Critical logout error:', error);
      // Force clear everything even if Supabase fails
      setUser(null);
      setSession(null);
      setProfile(null);
      window.location.replace('/entrance');
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(profileData);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profileData);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isAuthComplete,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;