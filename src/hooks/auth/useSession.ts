
import { useState } from "react";
import { User, Session } from "@supabase/supabase-js";

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return {
    user,
    setUser,
    session,
    setSession,
    isLoading,
    setIsLoading
  };
}
