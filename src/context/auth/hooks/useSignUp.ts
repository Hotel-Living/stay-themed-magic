
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";
import { fetchProfile, updateUserProfile } from "../authUtils";
import { useToast } from "@/hooks/use-toast";

interface SignUpProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

interface SignUpResult {
  success: boolean;
  error: string | null;
}

export function useSignUp({ setIsLoading, setProfile }: SignUpProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();

  const signUp = async (
    email: string,
    password: string,
    userData?: Partial<Profile>
  ): Promise<SignUpResult> => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      // Determine if signing up as hotel owner
      const isHotelSignUp = window.location.pathname.includes('hotel-signup');
      console.log(`SignUp attempt from: ${window.location.pathname}, isHotelSignUp: ${isHotelSignUp}`);
      
      // If hotel signup but no userData or is_hotel_owner flag not set
      if (isHotelSignUp) {
        userData = {
          ...userData,
          is_hotel_owner: true
        };
      }
      
      // Sign up with Supabase - explicitly require email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData, // Store user data in user_metadata
          emailRedirectTo: `${window.location.origin}/login` // Redirect to login page after email confirmation
        }
      });
      
      if (error) {
        console.error("Sign-up error:", error);
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        console.log("User signup initiated:", data.user.email);
        
        // Notify admin about the new registration
        try {
          const { data: notifyData, error: notifyError } = await supabase.functions.invoke(
            "notify-admin-registration", 
            { body: { user: data.user } }
          );
          
          if (notifyError) {
            console.error("Admin notification error:", notifyError);
          } else {
            console.log("Admin notification sent:", notifyData);
          }
        } catch (notifyErr) {
          console.error("Failed to send admin notification:", notifyErr);
        }
        
        // Check if email confirmation is needed
        if (data.session === null) {
          // User needs to confirm email
          return { 
            success: true, 
            error: "Please check your email for confirmation link before signing in." 
          };
        }
        
        // In case confirmation is not required or was instant
        let profileData = await fetchProfile(data.user.id);
        
        if (!profileData && userData) {
          console.log("Creating profile explicitly for new user");
          profileData = await updateUserProfile(data.user, userData);
        }
        
        setProfile(profileData);
        
        // Return success without redirecting - let the component handle redirection
        return { success: true, error: null };
      }
      
      return { success: false, error: "Unknown error during signup" };
    } catch (err: any) {
      console.error("Sign-up error:", err);
      setAuthError(err.message || "An unexpected error occurred");
      return { success: false, error: err.message || "An unexpected error occurred" };
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, authError };
}
