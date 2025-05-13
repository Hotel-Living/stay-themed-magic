
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";
import { updateUserProfile } from "../authUtils";

interface ProfileManagementProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

export function useProfileManagement({ setIsLoading, setProfile }: ProfileManagementProps) {
  const { toast } = useToast();

  const updateProfile = async (user: User | null, data: Partial<Profile>) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const updatedProfile = await updateUserProfile(user, data);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado con éxito",
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar perfil",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile };
}
