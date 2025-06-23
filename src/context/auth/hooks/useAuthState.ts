
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
    console.log("Setting up auth state listener");
    
    // First, set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        
        if (event === 'SIGNED_OUT') {
          // Clear all auth state when signed out
          console.log("User signed out, clearing state");
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsLoading(false);
          return;
        }
        
        // Update session and user immediately
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Handle profile fetch with proper async/await
        if (currentSession?.user) {
          try {
            const profileData = await fetchProfile(currentSession.user.id);
            console.log("Profile fetched:", profileData);
            setProfile(profileData);
          } catch (error) {
            console.error("Error fetching profile:", error);
            // Don't throw error to prevent blocking auth flow
          } finally {
            setIsLoading(false);
          }
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Then check for existing session
    const checkInitialSession = async () => {
      try {
        console.log("Checking initial session...");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          setIsLoading(false);
          return;
        }
        
        console.log("Initial session check:", data.session?.user?.email);
        
        // Update session and user
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        // Fetch profile if user is logged in
        if (data.session?.user) {
          try {
            const profileData = await fetchProfile(data.session.user.id);
            console.log("Initial profile:", profileData);
            setProfile(profileData);
          } catch (error) {
            console.error("Error fetching initial profile:", error);
          }
        }
      } catch (error) {
        console.error("Error in initial session check:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Run initial session check
    checkInitialSession();

    // Clean up subscription
    return () => {
      console.log("Cleaning up auth subscription");
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
