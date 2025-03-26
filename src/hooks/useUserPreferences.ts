
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserPreferences, PreferencesFormData } from "@/types/preferences";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user preferences
  const fetchUserPreferences = async () => {
    if (!user) return null;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching preferences:', error);
        return null;
      }
      
      setPreferences(data);
      return data;
    } catch (error) {
      console.error('Error in fetchUserPreferences:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Save or update preferences
  const savePreferences = async (formData: PreferencesFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save your preferences",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setIsLoading(true);
      
      // Check if the user already has preferences
      const existing = await fetchUserPreferences();
      
      if (existing) {
        // Update existing preferences
        const { data, error } = await supabase
          .from('user_preferences')
          .update(formData)
          .eq('user_id', user.id)
          .select()
          .single();
          
        if (error) {
          toast({
            title: "Error",
            description: "Failed to update preferences",
            variant: "destructive",
          });
          console.error('Error updating preferences:', error);
          return null;
        }
        
        setPreferences(data);
        
        toast({
          title: "Success",
          description: "Your preferences have been updated",
        });
        
        return data;
      } else {
        // Create new preferences
        const { data, error } = await supabase
          .from('user_preferences')
          .insert({
            user_id: user.id,
            ...formData
          })
          .select()
          .single();
          
        if (error) {
          toast({
            title: "Error",
            description: "Failed to save preferences",
            variant: "destructive",
          });
          console.error('Error creating preferences:', error);
          return null;
        }
        
        setPreferences(data);
        
        toast({
          title: "Success",
          description: "Your preferences have been saved",
        });
        
        return data;
      }
    } catch (error) {
      console.error('Error in savePreferences:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (user) {
      fetchUserPreferences();
    } else {
      setPreferences(null);
      setIsLoading(false);
    }
  }, [user]);

  return {
    preferences,
    isLoading,
    fetchUserPreferences,
    savePreferences
  };
}
