
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/integrations/supabase/types-custom";
import { useSignUp } from "./useSignUp";
import { useSignIn } from "./useSignIn";
import { useSignOut } from "./useSignOut";
import { useProfileManagement } from "./useProfileManagement";

interface AuthStateProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

export function useAuthMethods({ setIsLoading, setProfile }: AuthStateProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Use refactored hooks
  const { signUp } = useSignUp({ setIsLoading, setProfile });
  const { signIn } = useSignIn({ setIsLoading, setProfile });
  const { signOut } = useSignOut({ setIsLoading });
  const { updateProfile } = useProfileManagement({ setIsLoading, setProfile });

  return {
    signUp,
    signIn,
    signOut,
    updateProfile,
    authError
  };
}
