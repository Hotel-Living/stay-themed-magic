
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUserAuth = (id: string | undefined) => {
  const [authData, setAuthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchUserAuth = async () => {
      if (!id) return;
      
      try {
        // Use the get-user-email function to fetch email and auth data
        const { data, error } = await supabase.functions.invoke("get-user-email", {
          body: { userId: id }
        });

        if (error) throw error;
        
        setAuthData(data);
        setIsEmailVerified(data?.email_confirmed || false);
      } catch (error: any) {
        console.error("Error fetching user auth data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAuth();
  }, [id]);

  // Function to resend verification email
  const resendVerificationEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke("resend-verification-email", {
        body: { email }
      });

      if (error) throw error;
      
      return { success: true, message: "Verification email sent successfully" };
    } catch (error: any) {
      console.error("Error resending verification email:", error);
      return { 
        success: false, 
        message: error.message || "Failed to resend verification email" 
      };
    }
  };

  return { authData, loading, isEmailVerified, resendVerificationEmail };
};
