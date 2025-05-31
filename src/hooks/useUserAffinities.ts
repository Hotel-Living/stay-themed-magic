
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UserAffinity {
  id: string;
  user_id: string;
  theme_id: string;
  created_at: string;
  themes: {
    id: string;
    name: string;
    description?: string;
    category?: string;
  };
}

export const useUserAffinities = () => {
  const [userAffinities, setUserAffinities] = useState<UserAffinity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserAffinities = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_affinities')
        .select(`
          id,
          user_id,
          theme_id,
          created_at,
          themes (
            id,
            name,
            description,
            category
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setUserAffinities(data || []);
    } catch (error: any) {
      console.error('Error fetching user affinities:', error);
      toast.error('Failed to load your affinities');
    } finally {
      setLoading(false);
    }
  };

  const addAffinity = async (themeId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_affinities')
        .insert({
          user_id: user.id,
          theme_id: themeId
        });

      if (error) throw error;
      
      await fetchUserAffinities();
      toast.success('Affinity added successfully');
    } catch (error: any) {
      console.error('Error adding affinity:', error);
      toast.error('Failed to add affinity');
    }
  };

  const removeAffinity = async (themeId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_affinities')
        .delete()
        .eq('user_id', user.id)
        .eq('theme_id', themeId);

      if (error) throw error;
      
      await fetchUserAffinities();
      toast.success('Affinity removed successfully');
    } catch (error: any) {
      console.error('Error removing affinity:', error);
      toast.error('Failed to remove affinity');
    }
  };

  useEffect(() => {
    fetchUserAffinities();
  }, [user]);

  return {
    userAffinities,
    loading,
    addAffinity,
    removeAffinity,
    refetch: fetchUserAffinities
  };
};
