
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { Profile } from "@/integrations/supabase/types-custom";
import { supabase } from "@/integrations/supabase/client";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        // Update session and user immediately (synchronous)
        setSession(session);
        setUser(session?.user ?? null);
        
        // Handle profile loading asynchronously using setTimeout to prevent deadlock
        if (session?.user) {
          // Defer profile fetching to avoid blocking the auth state change
          setTimeout(async () => {
            try {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (profileData) {
                setProfile(profileData);
                console.log("Profile loaded:", profileData);
              }
            } catch (error) {
              console.error("Profile fetch error:", error);
              // Don't throw here, just log the error
            }
          }, 0);
        } else {
          // Clear profile immediately when no session
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Handle initial profile loading
      if (session?.user) {
        setTimeout(async () => {
          try {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (profileData) {
              setProfile(profileData);
            }
          } catch (error) {
            console.error("Initial profile fetch error:", error);
          }
        }, 0);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    profile,
    session,
    isLoading,
    setProfile,
    setIsLoading,
    setUser,
    setSession
  };
}
