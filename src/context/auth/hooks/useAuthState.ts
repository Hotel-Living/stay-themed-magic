
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

    // Priority-based user type detection to prevent conflicts
    const isAssociationUser = user.user_metadata?.association_name;
    const isHotelOwner = user.user_metadata?.is_hotel_owner;
    const isPromoter = user.user_metadata?.role === 'promoter';
    const isTraveler = !isAssociationUser && !isHotelOwner && !isPromoter;

    console.log("User type analysis:", {
      isAssociationUser: !!isAssociationUser,
      isHotelOwner: !!isHotelOwner,
      isPromoter: !!isPromoter,
      isTraveler: !!isTraveler
    });

    // Determine correct redirect based on user type priority
    if (isAssociationUser) {
      console.log("Association user detected, navigating to panel-asociacion");
      console.log("Association name:", user.user_metadata.association_name);
      navigate("/panel-asociacion", { replace: true });
    } else if (isHotelOwner) {
      console.log("Hotel owner detected, navigating to hotel dashboard");
      navigate("/hotel-dashboard", { replace: true });
    } else if (isPromoter) {
      console.log("Promoter detected, navigating to promoter dashboard");
      navigate("/promoter/dashboard", { replace: true });
    } else if (isTraveler) {
      console.log("Traveler detected, navigating to user dashboard");
      navigate("/user-dashboard", { replace: true });
    } else {
      console.log("Unknown user type, defaulting to user dashboard");
      navigate("/user-dashboard", { replace: true });
    }
    
    console.log("=== REDIRECT HANDLER END ===");
  };

  const shouldRedirect = (user: User, currentPath: string) => {
    const isAssociationUser = user.user_metadata?.association_name;
    const isHotelOwner = user.user_metadata?.is_hotel_owner;
    const isPromoter = user.user_metadata?.role === 'promoter';
    const isTraveler = !isAssociationUser && !isHotelOwner && !isPromoter;

    const isOnAuthPage = currentPath === '/login' || currentPath === '/signup' || currentPath === '/' || currentPath.includes('confirm');
    
    // Check if user is on wrong dashboard based on their type
    const isOnWrongDashboard = (
      (isAssociationUser && currentPath !== '/panel-asociacion') ||
      (isHotelOwner && !isAssociationUser && currentPath !== '/hotel-dashboard') ||
      (isPromoter && !isAssociationUser && !isHotelOwner && currentPath !== '/promoter/dashboard') ||
      (isTraveler && currentPath !== '/user-dashboard')
    );

    return isOnAuthPage || isOnWrongDashboard;
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
          
          const currentPath = window.location.pathname;
          
          if (shouldRedirect(session.user, currentPath)) {
            console.log("Redirect needed for user type and current path");
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
