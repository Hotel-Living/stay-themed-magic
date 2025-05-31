
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface RecommendedHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  price_per_month: number;
  main_image_url?: string;
  hotel_themes: Array<{
    themes: {
      id: string;
      name: string;
      category?: string;
    };
  }>;
  hotel_images: Array<{
    image_url: string;
    is_main: boolean;
  }>;
}

export const useRecommendedHotels = () => {
  const [recommendedHotels, setRecommendedHotels] = useState<RecommendedHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchRecommendedHotels = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // First, get user's affinities
      const { data: userAffinities, error: affinitiesError } = await supabase
        .from('user_affinities')
        .select('theme_id')
        .eq('user_id', user.id);

      if (affinitiesError) throw affinitiesError;

      if (!userAffinities || userAffinities.length === 0) {
        setRecommendedHotels([]);
        return;
      }

      const userThemeIds = userAffinities.map(ua => ua.theme_id);

      // Get hotels that share at least one affinity with the user
      const { data: hotels, error: hotelsError } = await supabase
        .from('hotels')
        .select(`
          id,
          name,
          city,
          country,
          price_per_month,
          main_image_url,
          hotel_themes!inner (
            themes (
              id,
              name,
              category
            )
          ),
          hotel_images (
            image_url,
            is_main
          )
        `)
        .eq('status', 'approved')
        .in('hotel_themes.theme_id', userThemeIds)
        .limit(6);

      if (hotelsError) throw hotelsError;

      setRecommendedHotels(hotels || []);
    } catch (error: any) {
      console.error('Error fetching recommended hotels:', error);
      setRecommendedHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedHotels();
  }, [user]);

  return {
    recommendedHotels,
    loading,
    refetch: fetchRecommendedHotels
  };
};
