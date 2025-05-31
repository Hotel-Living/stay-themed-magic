
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
  recommendation_reason?: string;
  matched_affinities?: string[];
}

export const useRecommendedHotels = () => {
  const [recommendedHotels, setRecommendedHotels] = useState<RecommendedHotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [hiddenHotels, setHiddenHotels] = useState<string[]>([]);
  const { user } = useAuth();

  const fetchRecommendedHotels = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get user's affinities
      const { data: userAffinities, error: affinitiesError } = await supabase
        .from('user_affinities')
        .select(`
          theme_id,
          themes (
            id,
            name,
            category
          )
        `)
        .eq('user_id', user.id);

      if (affinitiesError) throw affinitiesError;

      // Get user's saved hotels for additional context
      const { data: savedHotels, error: savedError } = await supabase
        .from('favorites')
        .select('hotel_id')
        .eq('user_id', user.id);

      if (savedError) throw savedError;

      const savedHotelIds = savedHotels?.map(fav => fav.hotel_id) || [];
      const userThemeIds = userAffinities?.map(ua => ua.theme_id) || [];

      if (userThemeIds.length === 0) {
        // If no affinities, show popular hotels
        const { data: hotels, error: hotelsError } = await supabase
          .from('hotels')
          .select(`
            id,
            name,
            city,
            country,
            price_per_month,
            main_image_url,
            hotel_themes (
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
          .not('id', 'in', `(${savedHotelIds.join(',') || 'null'})`)
          .limit(6);

        if (hotelsError) throw hotelsError;

        const hotelsWithReason = (hotels || []).map(hotel => ({
          ...hotel,
          recommendation_reason: "Popular choice"
        }));

        setRecommendedHotels(hotelsWithReason);
        return;
      }

      // Get hotels that match user's affinities
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
            theme_id,
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
        .not('id', 'in', `(${savedHotelIds.join(',') || 'null'})`)
        .limit(8);

      if (hotelsError) throw hotelsError;

      // Process hotels to add recommendation reasons
      const hotelsWithReasons = (hotels || []).map(hotel => {
        const matchedThemes = hotel.hotel_themes
          .filter(ht => userThemeIds.includes(ht.theme_id))
          .map(ht => ht.themes.name);

        return {
          ...hotel,
          recommendation_reason: matchedThemes.length > 0 
            ? `Based on your interest in: ${matchedThemes.join(', ')}`
            : "Recommended for you",
          matched_affinities: matchedThemes
        };
      });

      // Remove duplicates and limit to 6
      const uniqueHotels = hotelsWithReasons
        .filter((hotel, index, self) => 
          index === self.findIndex(h => h.id === hotel.id)
        )
        .filter(hotel => !hiddenHotels.includes(hotel.id))
        .slice(0, 6);

      setRecommendedHotels(uniqueHotels);
    } catch (error: any) {
      console.error('Error fetching recommended hotels:', error);
      setRecommendedHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const hideHotel = (hotelId: string) => {
    setHiddenHotels(prev => [...prev, hotelId]);
    setRecommendedHotels(prev => prev.filter(hotel => hotel.id !== hotelId));
  };

  useEffect(() => {
    fetchRecommendedHotels();
  }, [user, hiddenHotels]);

  return {
    recommendedHotels,
    loading,
    hideHotel,
    refetch: fetchRecommendedHotels
  };
};
