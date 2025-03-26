
import { useSession } from "./auth/useSession";
import { useSignUp } from "./auth/useSignUp";
import { useSignIn } from "./auth/useSignIn";
import { useSignOut } from "./auth/useSignOut";
import { usePasswordReset } from "./auth/usePasswordReset";
import { Profile } from "@/integrations/supabase/types-custom";

export function useAuthOperations() {
  const { user, setUser, session, setSession, isLoading, setIsLoading } = useSession();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();
  const { requestPasswordReset, updatePassword } = usePasswordReset();

  const resendVerificationEmail = async (email: string) => {
    // Implementation will be added in AuthContext
  };

  const updateProfile = async (data: Partial<Profile>) => {
    // Implementation will be added in AuthContext
  };

  return {
    user,
    setUser,
    session,
    setSession,
    isLoading,
    setIsLoading,
    signUp,
    signIn,
    signOut,
    requestPasswordReset,
    updatePassword,
    resendVerificationEmail,
    updateProfile
  };
}
