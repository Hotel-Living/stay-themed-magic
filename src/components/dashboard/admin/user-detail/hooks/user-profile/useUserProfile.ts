
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
        
        // Enhance profile with email from auth.users (requires admin privileges)
        const enhancedProfile = { ...profileData, email: "" }; // Initialize with empty email
        
        try {
          const { data: userData, error: userError } = await supabase.functions.invoke("get-user-email", {
            body: { userId: id }
          });

          if (!userError && userData?.email) {
            enhancedProfile.email = userData.email;
          }
        } catch (emailError) {
          console.warn("Could not fetch user email:", emailError);
        }
        
        setProfile(enhancedProfile);
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

  // Explicitly typed as Promise<void> with no implicit or explicit boolean returns
  const updateAdminNote = async (userId: string, note: string): Promise<void> => {
    if (!userId) {
      // Early return with no value
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ admin_note: note })
        .eq("id", userId);

      if (error) {
        throw error;
      }
      
      // Update state without returning anything
      setProfile((prev) => {
        if (!prev) return prev;
        return { ...prev, admin_note: note };
      });
      
      toast({
        title: "Success",
        description: "Admin note updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating admin note:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update admin note",
        variant: "destructive"
      });
    }
    // Function ends without return - implicitly returns undefined (void)
  };

  return { profile, setProfile, loading, updateAdminNote };
};
