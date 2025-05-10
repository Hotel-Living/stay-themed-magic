
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
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (profileError) throw profileError;

        const enhancedProfile = { ...profileData, email: "" };

        try {
          const { data: userData, error: userError } = await supabase.functions.invoke("get-user-email", {
            body: { userId: id },
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
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id, toast]);

  const updateAdminNote = async (userId: string, note: string): Promise<void> => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ admin_note: note })
        .eq("id", userId);

      if (error) {
        console.error("Error updating admin note:", error.message);
        toast({
          title: "Error",
          description: error.message || "Failed to update admin note.",
          variant: "destructive"
        });
      } else {
        setProfile((prev) => prev ? { ...prev, admin_note: note } : prev);
        toast({
          title: "Note updated",
          description: "The admin note was saved successfully.",
        });
      }

    } catch (err: any) {
      console.error("Unexpected error:", err);
      toast({
        title: "Error",
        description: err.message || "Unexpected failure.",
        variant: "destructive"
      });
    }

    // ✅ No return value here.
  };

  return { profile, setProfile, loading, updateAdminNote };
};
