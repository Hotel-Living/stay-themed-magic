
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useUserProfile = (id: string | undefined) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) return;
      
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (profileError) throw profileError;
        
        // Fetch user email from auth.users (requires admin privileges)
        try {
          const { data: userData, error: userError } = await supabase.functions.invoke("get-user-email", {
            body: { userId: id }
          });

          if (!userError && userData?.email) {
            profileData.email = userData.email;
          }
        } catch (emailError) {
          console.warn("Could not fetch user email:", emailError);
        }
        
        setProfile(profileData);
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch user profile",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id, toast]);

  return { profile, setProfile, loading };
};
