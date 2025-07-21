
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCorrectRedirect = (user: User) => {
    // Determine correct redirect based on user metadata
    if (user.user_metadata?.association_name) {
      console.log("Redirecting association user to panel");
      window.location.href = "/panel-asociacion";
    } else if (user.user_metadata?.is_hotel_owner) {
      console.log("Redirecting hotel owner to dashboard");
      window.location.href = "/hotel-dashboard";
    } else if (user.user_metadata?.role === 'promoter') {
      console.log("Redirecting promoter to dashboard");
      window.location.href = "/promoter/dashboard";
    } else {
      console.log("Redirecting traveler to user dashboard");
      window.location.href = "/user-dashboard";
    }
  };

  useEffect(() => {
    console.log("Setting up auth state listeners");

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Handle post-authentication redirects
        if (event === 'SIGNED_IN' && session?.user) {
          // Only redirect if we're on a login/auth page to avoid disrupting navigation
          const currentPath = window.location.pathname;
          if (currentPath === '/login' || currentPath === '/signup' || currentPath === '/' || currentPath.includes('confirm')) {
            console.log("Post-authentication redirect needed");
            setTimeout(() => {
              handleCorrectRedirect(session.user);
            }, 500);
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      console.log("Cleaning up auth state listeners");
      subscription.unsubscribe();
    };
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
