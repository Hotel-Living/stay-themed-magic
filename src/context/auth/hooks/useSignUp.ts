
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/integrations/supabase/types-custom";
import { fetchProfile, updateUserProfile } from "../authUtils";

interface SignUpProps {
  setIsLoading: (isLoading: boolean) => void;
  setProfile: (profile: Profile | null) => void;
}

export function useSignUp({ setIsLoading, setProfile }: SignUpProps) {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, userData?: Partial<Profile>) => {
    try {
      setIsLoading(true);
      
      // Determine if this is a hotel owner signup
      const isHotelOwner = userData?.is_hotel_owner === true;
      console.log(`Signing up user as ${isHotelOwner ? 'hotel owner' : 'traveler'} with email: ${email}`);
      
      // Add is_hotel_owner to user metadata for later reference during profile creation
      const metadata = {
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        is_hotel_owner: isHotelOwner
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        toast({
          title: "Error al registrarse",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        console.log("User created successfully:", data.user.id);
        
        // Ensure profile exists with proper flag
        try {
          // Attempt to fetch profile
          const profileData = await fetchProfile(data.user.id);
          
          if (!profileData) {
            // If no profile exists, create one explicitly with user data
            console.log("No profile found after signup, creating one...");
            await updateUserProfile(data.user, {
              id: data.user.id,
              first_name: userData?.first_name || null,
              last_name: userData?.last_name || null,
              is_hotel_owner: isHotelOwner,
            });
          } else {
            // If profile exists but needs update
            console.log("Updating existing profile with user data");
            await updateUserProfile(data.user, userData || {});
          }
        } catch (profileError) {
          console.error("Error ensuring profile exists:", profileError);
        }
      }

      toast({
        title: "¡Cuenta creada!",
        description: "Por favor, verifica tu correo electrónico para activar tu cuenta",
      });
      
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message || "Ha ocurrido un error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp };
}
