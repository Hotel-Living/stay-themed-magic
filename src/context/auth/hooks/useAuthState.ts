
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
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleCorrectRedirect = async (currentUser: User, currentProfile: Profile | null) => {
    try {
      setIsRedirecting(true);
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

      // Check role from profile first, then fallback to user metadata
      // Match the same logic as RegisterRole.tsx for consistency
      const userRole = currentProfile?.role || 
                      (currentUser.user_metadata?.is_hotel_owner ? 'hotel_owner' : 
                       currentUser.user_metadata?.association_name ? 'association' : 
                       currentUser.user_metadata?.role === 'promoter' ? 'promoter' : 'guest');
      
      console.log("User role determination:", {
        profileRole: currentProfile?.role,
        userMetadata: currentUser.user_metadata,
        finalRole: userRole
      });

      // Route based on role - matching RegisterRole.tsx logic
      switch (userRole) {
        case 'hotel_owner':
          console.log("Redirecting hotel owner to panel-hotel");
          navigate('/panel-hotel');
          setIsRedirecting(false);
          return;
        case 'association':
          console.log("Redirecting association to panel-asociacion");
          navigate('/panel-asociacion');
          setIsRedirecting(false);
          return;
        case 'promoter':
          console.log("Redirecting promoter to promoter dashboard");
          navigate('/promoter/dashboard');
          setIsRedirecting(false);
          return;
        case 'guest':
        default:
          console.log("Redirecting to user dashboard (guest/default)");
          navigate('/user-dashboard');
          setIsRedirecting(false);
          return;
      }
      
      } catch (error) {
        console.error("Error in handleCorrectRedirect:", error);
        // Fallback to user dashboard if everything fails
        navigate('/user-dashboard');
        setIsRedirecting(false);
      } finally {
        console.log("=== REDIRECT LOGIC END ===");
        // Always ensure loading is set to false
        setIsLoading(false);
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
          
          // Handle redirect only for SIGNED_IN event to avoid conflicts with fallback
          // BUT exclude password reset pages and register-role page to allow users to complete the flow
          const currentPath = window.location.pathname;
          const hasRole = profileData?.role && 
                         profileData.role !== null && 
                         profileData.role !== undefined &&
                         profileData.role !== '';
          
          // CRITICAL: Check if redirect is needed BEFORE setting isLoading to false
          const needsRedirect = event === 'SIGNED_IN' && 
                               !currentPath.includes('/reset-password') && 
                               !currentPath.includes('/register-role') &&
                               hasRole;
          
          if (needsRedirect) {
            // Set redirecting BEFORE ending loading to prevent flash
            setIsRedirecting(true);
            try {
              await handleCorrectRedirect(session.user, profileData);
              // isRedirecting will be cleared in handleCorrectRedirect
            } catch (redirectError) {
              console.error("Redirect failed, setting loading to false:", redirectError);
              setIsLoading(false);
              setIsRedirecting(false);
            }
          } else {
            // No redirect needed, safe to show current page
            setIsLoading(false);
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
    isRedirecting,
    setProfile,
    setIsLoading,
    setUser,
    setSession
  };
}
