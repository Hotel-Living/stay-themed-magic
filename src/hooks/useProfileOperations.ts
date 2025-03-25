
import { useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types-custom";
import { useToast } from "@/hooks/use-toast";
import { handleApiError } from "@/utils/errorHandling";

export function useProfileOperations() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      setIsLoading(true);
      console.log("Fetching profile for user:", userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        handleApiError(error, "Error loading your profile");
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
      return completeProfile;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      handleApiError(error, "Error loading your profile");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (user: User | null, data: Partial<Profile>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Usuario no encontrado. Por favor, inicia sesión de nuevo.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setIsLoading(true);
      console.log("Updating profile for user:", user.id, data);
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        handleApiError(error, "Error al actualizar perfil");
        return null;
      }

      // Re-fetch profile to get updated data
      const updatedProfile = await fetchProfile(user.id);

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado con éxito",
      });
      
      return updatedProfile;
    } catch (error: any) {
      handleApiError(error, "Error al actualizar perfil");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchProfile, toast]);

  return {
    profile,
    isLoading,
    fetchProfile,
    updateProfile
  };
}
