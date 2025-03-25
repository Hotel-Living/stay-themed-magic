
import { Session, User } from "@supabase/supabase-js";
import { Profile } from "@/integrations/supabase/types-custom";

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userData?: Partial<Profile>) => Promise<void>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<void>;
}

export interface AuthFormProps {
  onSuccess?: () => void;
  redirectPath?: string;
}
