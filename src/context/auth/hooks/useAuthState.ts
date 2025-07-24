
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";
import { useNavigate } from "react-router-dom";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleCorrectRedirect = async (currentUser: User, currentProfile: Profile | null) => {
    try {
      console.log("=== REDIRECT LOGIC START ===");
      console.log("Current user:", currentUser.email);
      console.log("Current profile:", currentProfile);
      console.log("User metadata:", currentUser.user_metadata);
      
      // First check if user is admin with improved error handling
      console.log("Checking admin status...");
      
      let isAdmin = false;
      try {
        const { data: adminResult, error: adminError } = await supabase.rpc('has_role', { 
          role_name: 'admin' 
        });
        
        console.log("Admin RPC result:", { data: adminResult, error: adminError });
        
        if (adminError) {
          console.error("Admin RPC error:", adminError);
          // Try alternative direct query as fallback
          console.log("Trying direct admin query as fallback...");
          const { data: adminUsers, error: directError } = await supabase
            .from('admin_users')
            .select('id')
            .eq('id', currentUser.id)
            .limit(1);
          
          console.log("Direct admin query result:", { data: adminUsers, error: directError });
          
          if (!directError && adminUsers && adminUsers.length > 0) {
            isAdmin = true;
            console.log("User is admin (via direct query)");
          }
        } else {
          isAdmin = !!adminResult;
          console.log("User is admin (via RPC):", isAdmin);
        }
      } catch (rpcError) {
        console.error("Exception during admin check:", rpcError);
        // Try direct query as final fallback
        try {
          const { data: adminUsers, error: directError } = await supabase
            .from('admin_users')
            .select('id')
            .eq('id', currentUser.id)
            .limit(1);
          
          if (!directError && adminUsers && adminUsers.length > 0) {
            isAdmin = true;
            console.log("User is admin (via fallback direct query)");
          }
        } catch (fallbackError) {
          console.error("Fallback admin check also failed:", fallbackError);
        }
      }

      // If admin, redirect to Fernando panel
      if (isAdmin) {
        console.log("Redirecting admin to Fernando panel");
        navigate('/panel-fernando/hotels');
        return;
      }

      console.log("User is not admin, checking other roles...");

      // Check for association role
      if (currentUser.user_metadata?.is_association) {
        console.log("Redirecting to association dashboard");
        navigate('/association-dashboard');
        return;
      }

      // Check for hotel owner role - Enhanced logic with multiple sources
      const isHotelOwner = currentUser.user_metadata?.is_hotel_owner || 
                          currentProfile?.is_hotel_owner || 
                          currentProfile?.role === 'hotel_owner';
      
      console.log("Hotel owner check:", {
        userMetadata: currentUser.user_metadata?.is_hotel_owner,
        profileFlag: currentProfile?.is_hotel_owner,
        profileRole: currentProfile?.role,
        finalResult: isHotelOwner
      });
      
      if (isHotelOwner) {
        console.log("Redirecting to hotel dashboard");
        navigate('/hotel-dashboard');
        return;
      }

      // Check for promoter role
      if (currentUser.user_metadata?.is_promoter) {
        console.log("Redirecting to promoter dashboard");
        navigate('/promoter-dashboard');
        return;
      }

      // Default to traveler dashboard
      console.log("Redirecting to user dashboard (default)");
      navigate('/user-dashboard');
      
    } catch (error) {
      console.error("Error in handleCorrectRedirect:", error);
      // Fallback to user dashboard if everything fails
      navigate('/user-dashboard');
    } finally {
      console.log("=== REDIRECT LOGIC END ===");
    }
  };

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log("Auth state changed:", event, session?.user?.email);
        
        if (session?.user) {
          // Critical validation: Verify session has access token
          if (!session.access_token) {
            console.error("❌ INVALID SESSION DETECTED - Missing access token");
            console.log("Access token:", !!session.access_token);
            
            // Force cleanup of invalid session
            setUser(null);
            setSession(null);
            setProfile(null);
            setIsLoading(false);
            return;
          }
          
          console.log("✅ Valid session detected:", {
            hasToken: !!session.access_token,
            userEmail: session.user.email,
            emailConfirmed: !!session.user.email_confirmed_at
          });
          
          setUser(session.user);
          setSession(session);
          
          // Fetch profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setProfile(profileData);
          setIsLoading(false);
          
          // Handle redirect only for SIGNED_IN event to avoid conflicts with fallback
          // BUT exclude password reset pages to allow users to complete the flow
          if (event === 'SIGNED_IN' && !window.location.pathname.includes('/reset-password')) {
            await handleCorrectRedirect(session.user, profileData);
          }
        } else {
          setUser(null);
          setSession(null);
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      if (session?.user) {
        setUser(session.user);
        setSession(session);
        
        // Fetch profile for existing session
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profileData }) => {
            if (mounted) {
              setProfile(profileData);
              setIsLoading(false);
            }
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
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
