
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleCorrectRedirect = (user: User) => {
    console.log("=== REDIRECT HANDLER START ===");
    console.log("User metadata:", user.user_metadata);
    console.log("Current path:", window.location.pathname);

    // Determine correct redirect based on user metadata
    if (user.user_metadata?.association_name) {
      console.log("Association user detected, navigating to panel-asociacion");
      console.log("Association name:", user.user_metadata.association_name);
      navigate("/panel-asociacion", { replace: true });
    } else if (user.user_metadata?.is_hotel_owner) {
      console.log("Hotel owner detected, navigating to hotel dashboard");
      navigate("/hotel-dashboard", { replace: true });
    } else if (user.user_metadata?.role === 'promoter') {
      console.log("Promoter detected, navigating to promoter dashboard");
      navigate("/promoter/dashboard", { replace: true });
    } else {
      console.log("Regular traveler detected, navigating to user dashboard");
      navigate("/user-dashboard", { replace: true });
    }
    
    console.log("=== REDIRECT HANDLER END ===");
  };

  useEffect(() => {
    console.log("Setting up auth state listeners");

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("=== AUTH STATE CHANGE ===");
        console.log("Event:", event);
        console.log("Session exists:", !!session);
        console.log("User ID:", session?.user?.id);
        console.log("Current path:", window.location.pathname);
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Handle post-authentication redirects
        if (event === 'SIGNED_IN' && session?.user) {
          console.log("SIGNED_IN event detected");
          console.log("User metadata:", session.user.user_metadata);
          
          // Only redirect if we're coming from an auth page or need to correct the route
          const currentPath = window.location.pathname;
          const isOnAuthPage = currentPath === '/login' || currentPath === '/signup' || currentPath === '/' || currentPath.includes('confirm');
          
          // Check if user is on wrong dashboard - prioritize association users
          const isAssociationUser = session.user.user_metadata?.association_name;
          const isOnWrongDashboard = (
            (isAssociationUser && currentPath !== '/panel-asociacion') ||
            (session.user.user_metadata?.is_hotel_owner && !isAssociationUser && currentPath !== '/hotel-dashboard') ||
            (session.user.user_metadata?.role === 'promoter' && !isAssociationUser && !session.user.user_metadata?.is_hotel_owner && currentPath !== '/promoter/dashboard') ||
            (!isAssociationUser && !session.user.user_metadata?.is_hotel_owner && session.user.user_metadata?.role !== 'promoter' && currentPath !== '/user-dashboard')
          );
          
          if (isOnAuthPage || isOnWrongDashboard) {
            console.log("Redirect needed - Auth page:", isOnAuthPage, "Wrong dashboard:", isOnWrongDashboard);
            // Use setTimeout to ensure state is fully updated before navigation
            setTimeout(() => {
              handleCorrectRedirect(session.user);
            }, 0);
          } else {
            console.log("No redirect needed, user is already on correct page");
          }
        }
        
        console.log("=== AUTH STATE CHANGE END ===");
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
  }, [navigate]);

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
