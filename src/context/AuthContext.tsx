import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  is_hotel_owner?: boolean;
  created_at?: string;
  updated_at?: string;
  avatar_url?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthComplete: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('AuthContext Debug - Fetching profile for userId:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('AuthContext Debug - Profile fetch result:', { data, error });

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      console.log('AuthContext Debug - Setting profile:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Get initial session with improved error handling
    const getInitialSession = async () => {
      try {
        // Add a small delay to prevent race conditions when returning to tabs
        if (document.visibilityState === 'visible' && document.hidden === false) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setIsLoading(false);
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener with improved persistence handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Handle different auth events with better state management
        if (event === 'SIGNED_IN' && session?.user) {
          // Keep loading true while fetching profile to prevent premature redirects
          setIsLoading(true);
          setSession(session);
          setUser(session.user);
          // Fetch profile data after sign in
          await fetchProfile(session.user.id);
          setIsLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsLoading(false);
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Handle token refresh without disrupting UI
          setSession(session);
          setUser(session.user);
          // Don't change loading state or refetch profile
        } else {
          // Handle other events gracefully
          setSession(session);
          setUser(session?.user ?? null);
          if (!session) {
            setProfile(null);
          }
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      console.log("AuthContext signOut called");
      setIsLoading(true);
      
      // Clear profile and user state immediately
      setProfile(null);
      setUser(null);
      setSession(null);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      } else {
        console.log("Supabase signOut successful");
        // Redirect to main index page after successful logout
        window.location.href = "/";
      }
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if there's an error, redirect to clear the session
      window.location.href = "/";
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthComplete = !isLoading && !!user;

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    isAuthComplete,
    signOut,
  };

  // Temporary debugging logs for hotel dashboard issue
  console.log('AuthContext Debug - Current state:', {
    hasUser: !!user,
    hasProfile: !!profile,
    hasSession: !!session,
    isLoading,
    profileData: profile
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;