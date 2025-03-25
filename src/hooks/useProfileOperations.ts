
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";
import { useToast } from "@/hooks/use-toast";
import { handleSupabaseError, handleAppError } from "@/utils/errorHandling";

export function useProfileOperations() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        handleSupabaseError(error, "Error loading your profile");
        return;
      }

      console.log("Profile data:", data);
      
      // Make sure we're setting a complete Profile object with all required fields
      // If role or email_verified are missing, provide default values
      const completeProfile: Profile = {
        ...data,
        role: data.role as 'guest' | 'hotel_owner' | 'admin' || 'guest',
        email_verified: data.email_verified ?? false
      };
      
      setProfile(completeProfile);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      handleAppError(error, "Error loading your profile");
    }
  };

  const updateProfile = async (user: User | null, data: Partial<Profile>) => {
    if (!user) return;
    
    try {
      console.log("Updating profile for user:", user.id, data);
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        handleSupabaseError(error, "Error al actualizar perfil");
        return;
      }

      // Re-fetch profile to get updated data
      await fetchProfile(user.id);

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado con éxito",
      });
    } catch (error: any) {
      handleAppError(error, "Error al actualizar perfil");
    }
  };

  return {
    profile,
    fetchProfile,
    updateProfile
  };
}
