
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";
import { fetchProfile, updateUserProfile } from "../authUtils";
import { useToast } from "@/hooks/use-toast";
import { validatePassword, validateEmail, sanitizeInput } from "@/utils/passwordValidation";

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

      // Client-side validation
      if (!validateEmail(email)) {
        return { success: false, error: "Please enter a valid email address" };
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return { success: false, error: "Password does not meet security requirements" };
      }

      // Sanitize inputs
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedFirstName = userData?.first_name ? sanitizeInput(userData.first_name) : undefined;
      const sanitizedLastName = userData?.last_name ? sanitizeInput(userData.last_name) : undefined;
      
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
      
      // Sign up with Supabase - EXPLICITLY require email confirmation
      const { data, error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password,
        options: {
          data: {
            ...userData,
            first_name: sanitizedFirstName,
            last_name: sanitizedLastName
          }, // Store user data in user_metadata
          emailRedirectTo: `${window.location.origin}/login`, // Redirect to login page after email confirmation
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
            { 
              body: { 
                user: data.user,
                userData: userData || {}
              } 
            }
          );
          
          if (notifyError) {
            console.error("Admin notification error:", notifyError);
          } else {
            console.log("Admin notification sent:", notifyData);
          }
        } catch (notifyErr) {
          console.error("Failed to send admin notification:", notifyErr);
        }
        
        // Send welcome email
        try {
          const { data: welcomeData, error: welcomeError } = await supabase.functions.invoke(
            "send-welcome-email",
            {
              body: {
                email: data.user.email,
                firstName: userData?.first_name || "",
                isHotelOwner: !!userData?.is_hotel_owner,
                language: navigator.language.split('-')[0] || 'en'
              }
            }
          );
          
          if (welcomeError) {
            console.error("Welcome email error:", welcomeError);
          } else {
            console.log("Welcome email sent:", welcomeData);
          }
        } catch (welcomeErr) {
          console.error("Failed to send welcome email:", welcomeErr);
        }
        
        // Email confirmation is required for all new users
        return { 
          success: true, 
          error: "Please check your email for confirmation link before signing in." 
        };
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
