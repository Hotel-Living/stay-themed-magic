
import { useSession } from "./auth/useSession";
import { useSignUp } from "./auth/useSignUp";
import { useSignIn } from "./auth/useSignIn";
import { useSignOut } from "./auth/useSignOut";

export function useAuthOperations() {
  const { user, setUser, session, setSession, isLoading, setIsLoading } = useSession();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { signOut } = useSignOut();

  return {
    user,
    setUser,
    session,
    setSession,
    isLoading,
    setIsLoading,
    signUp,
    signIn,
    signOut
  };
}
