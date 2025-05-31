
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface TopAffinity {
  theme_id: string;
  themes: {
    id: string;
    name: string;
    description?: string;
    category?: string;
  };
}

export const useTopAffinities = () => {
  const [topAffinities, setTopAffinities] = useState<TopAffinity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTopAffinities = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Get user's selected affinities
        const { data: affinities, error } = await supabase
          .from('user_affinities')
          .select(`
            theme_id,
            themes (
              id,
              name,
              description,
              category
            )
          `)
          .eq('user_id', user.id)
          .limit(6); // Show top 6 affinities

        if (error) throw error;

        setTopAffinities(affinities || []);
      } catch (error) {
        console.error('Error fetching top affinities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAffinities();
  }, [user]);

  return {
    topAffinities,
    loading
  };
};
