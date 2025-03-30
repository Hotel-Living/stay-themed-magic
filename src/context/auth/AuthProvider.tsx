
import React, { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Profile } from "@/integrations/supabase/types-custom";
import AuthContext from "./AuthContext";
import { fetchProfile, redirectBasedOnUserRole, updateUserProfile } from "./authUtils";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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
          setTimeout(() => {
            fetchProfile(currentSession.user.id).then(profileData => {
              setProfile(profileData);
              setIsLoading(false);
              
              // Handle redirect ONLY on explicit sign in event
              if (event === 'SIGNED_IN') {
                console.log("SIGNED_IN event detected, redirecting based on role");
                if (profileData) {
                  redirectBasedOnUserRole(profileData);
                }
              }
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
      
      console.log("Current session check:", data.session?.user?.email);
      setSession(data.session);
      setUser(data.session?.user ?? null);
      
      if (data.session?.user) {
        const profileData = await fetchProfile(data.session.user.id);
        setProfile(profileData);
        // Don't redirect during initial session check to prevent unwanted redirects
        // when the user is already on the correct page
      }
      
      setIsLoading(false);
    };
    
    checkInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Signup function
  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error al registrarse",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (userData && data.user) {
        await updateProfile(userData);
      }

      toast({
        title: "¡Cuenta creada!",
        description: "Registro completado con éxito",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setAuthError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error.message);
        console.error("Auth error:", error);
        toast({
          title: "Error al iniciar sesión",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data?.user) {
        const profileData = await fetchProfile(data.user.id);
        setProfile(profileData);
        
        console.log("Profile data after login:", profileData);
        
        // Force immediate redirect to the appropriate dashboard based on role
        if (profileData?.is_hotel_owner === true) {
          console.log("HOTEL OWNER LOGIN DETECTED - Redirecting to hotel dashboard");
          window.location.href = '/hotel-dashboard';
        } else {
          console.log("TRAVELER LOGIN DETECTED - Redirecting to user dashboard");
          window.location.href = '/user-dashboard';
        }
      }
    } catch (err: any) {
      console.error("Sign-in error:", err);
      setAuthError("An unexpected error occurred during sign in");
      toast({
        title: "Error al iniciar sesión",
        description: err.message || "Ha ocurrido un error inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function with aggressive cleanup
  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // First check if we have a valid session before trying to sign out
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        console.log("No active session found, redirecting to login without calling signOut API");
        // Clear local state regardless
        setUser(null);
        setProfile(null);
        setSession(null);
        
        toast({
          title: "Sesión finalizada",
          description: "Tu sesión ha finalizado",
        });
        
        // Force page reload to clear any persistent state
        window.location.href = "/login";
        return;
      }
      
      console.log("Active session found, signing out properly");
      
      // Call signOut API with proper signout options to invalidate all sessions
      const { error } = await supabase.auth.signOut({
        scope: 'global' // Sign out from all sessions, not just current browser
      });

      if (error) {
        console.error("Error signing out:", error);
        toast({
          title: "Error al cerrar sesión",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Clear state explicitly
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Clear localStorage to ensure no stale auth data persists
      localStorage.removeItem('hotel-living-auth-key');
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión con éxito",
      });

      // Completely reload the application to clear any application state
      window.location.href = "/login";
    } catch (error: any) {
      console.error("Error in signOut function:", error);
      toast({
        title: "Error al cerrar sesión",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const updatedProfile = await updateUserProfile(user, data);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado con éxito",
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar perfil",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
