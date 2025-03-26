
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";
import { useProfileOperations } from "@/hooks/useProfileOperations";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { useSignIn } from "@/hooks/auth/useSignIn";
import { useSignOut } from "@/hooks/auth/useSignOut";
import { usePasswordReset } from "@/hooks/auth/usePasswordReset";
import { AuthContextType } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { handleAuthError } from "@/utils/errorHandling";

// Create the AuthContext with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { profile, fetchProfile, updateProfile: updateProfileData } = useProfileOperations();
  const { signUp: signUpHook } = useSignUp();
  const { signIn: signInHook } = useSignIn();
  const { signOut: signOutHook } = useSignOut();
  const { requestPasswordReset, updatePassword } = usePasswordReset();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST to ensure we don't miss auth changes during initialization
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event !== 'SIGNED_OUT') {
          // When the user signs in or session changes, fetch their profile
          await fetchProfile(session.user.id);
          
          // Check if the user is newly verified
          if (event === 'USER_UPDATED' && session.user.email_confirmed_at) {
            toast({
              title: "¡Correo verificado!",
              description: "Tu dirección de correo ha sido verificada correctamente.",
            });
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
        }
      }
    );

    // THEN check for existing session
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile, toast]);

  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    await signUpHook(email, password, userData);
  };

  const signIn = async (email: string, password: string, rememberMe = false) => {
    await signInHook(email, password, rememberMe);
  };

  const signOut = async () => {
    await signOutHook();
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return;
    await updateProfileData(user, data);
  };

  const resendVerificationEmail = async (email: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) {
        handleAuthError(error);
        return;
      }
      
      toast({
        title: "Email enviado",
        description: "Se ha enviado un nuevo enlace de verificación a tu correo electrónico",
      });
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    requestPasswordReset,
    updatePassword,
    resendVerificationEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
