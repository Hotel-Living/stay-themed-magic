
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
      
      // Sign up with Supabase - NO EMAIL VERIFICATION REQUIRED
      const { data, error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password,
        options: {
          data: {
            ...userData,
            first_name: sanitizedFirstName,
            last_name: sanitizedLastName
          } // Store user data in user_metadata
        }
      });
      
      if (error) {
        console.error("Sign-up error:", error);
        setAuthError(error.message);
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        console.log("User signup initiated:", data.user.email);
        
        // Async email notifications - don't block signup completion
        const emailPromises = [
          // Notify admin about the new registration with timeout
          Promise.race([
            supabase.functions.invoke("notify-admin-registration", { 
              body: { 
                user: data.user,
                userData: userData || {}
              } 
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Admin notification timeout')), 5000)
            )
          ]).catch(err => {
            console.error("Admin notification failed:", err.message);
            return { data: null, error: err };
          }),
          
          // Send welcome email with timeout
          Promise.race([
            supabase.functions.invoke("send-welcome-email", {
              body: {
                email: data.user.email,
                firstName: userData?.first_name || "",
                isHotelOwner: !!userData?.is_hotel_owner,
                language: navigator.language.split('-')[0] || 'en'
              }
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Welcome email timeout')), 5000)
            )
          ]).catch(err => {
            console.error("Welcome email failed:", err.message);
            return { data: null, error: err };
          })
        ];
        
        // Execute email promises in background without blocking
        Promise.allSettled(emailPromises).then(results => {
          results.forEach((result, index) => {
            const type = index === 0 ? 'Admin notification' : 'Welcome email';
            if (result.status === 'fulfilled') {
              console.log(`${type} completed:`, result.value);
            } else {
              console.error(`${type} failed:`, result.reason);
            }
          });
        });
        
        // Return success immediately - no email verification required
        return { 
          success: true, 
          error: null 
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
