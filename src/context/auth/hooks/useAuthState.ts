
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";
import { fetchProfile } from "../authUtils";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state and set up listeners
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        
        if (event === 'SIGNED_OUT') {
          // Clear all auth state when signed out
          setSession(null);
          setUser(null);
          setProfile(null);
          return;
        }
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to defer profile fetch to next event loop
          // This prevents potential recursive issues with onAuthStateChange
          setTimeout(() => {
            fetchProfile(currentSession.user.id).then(profileData => {
              setProfile(profileData);
              setIsLoading(false);
            });
          }, 0);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Initial session check
    const checkInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error checking session:", error);
        setIsLoading(false);
        return;
      }
      
      console.log("Initial session check:", data.session?.user?.email);
      setSession(data.session);
      setUser(data.session?.user ?? null);
      
      if (data.session?.user) {
        const profileData = await fetchProfile(data.session.user.id);
        setProfile(profileData);
      }
      
      setIsLoading(false);
    };
    
    checkInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    profile,
    setProfile,
    session,
    isLoading,
    setIsLoading
  };
}
