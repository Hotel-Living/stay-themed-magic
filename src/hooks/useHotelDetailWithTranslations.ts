
import { useState, useEffect } from 'react';
import { useHotelDetail } from '@/hooks/useHotelDetail';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';

interface HotelTranslation {
  translated_name?: string;
  translated_description?: string;
  translated_ideal_guests?: string;
  translated_atmosphere?: string;
  translated_perfect_location?: string;
  translation_status: string;
}

export const useHotelDetailWithTranslations = (hotelId?: string) => {
  const { data: hotel, isLoading, error } = useHotelDetail(hotelId);
  const { language } = useTranslation();
  const [translation, setTranslation] = useState<HotelTranslation | null>(null);
  const [translationLoading, setTranslationLoading] = useState(false);

  useEffect(() => {
    console.log('useHotelDetailWithTranslations - Current language:', language);
    console.log('useHotelDetailWithTranslations - Hotel ID:', hotelId);
    
    if (!hotel?.id || language === 'en') {
      console.log('useHotelDetailWithTranslations - Clearing translation (no hotel or English)');
      setTranslation(null);
      return;
    }

    const fetchTranslation = async () => {
      console.log('useHotelDetailWithTranslations - Fetching translation for:', hotel.id, 'language:', language);
      setTranslationLoading(true);
      try {
        const { data, error } = await supabase
          .from('hotel_translations')
          .select('*')
          .eq('hotel_id', hotel.id)
          .eq('language_code', language)
          .eq('translation_status', 'completed')
          .maybeSingle();

        if (error) {
          console.error('Error fetching translation:', error);
          setTranslation(null);
        } else {
          console.log('useHotelDetailWithTranslations - Translation found:', data);
          setTranslation(data);
        }
      } catch (error) {
        console.error('Translation fetch error:', error);
        setTranslation(null);
      } finally {
        setTranslationLoading(false);
      }
    };

    fetchTranslation();
  }, [hotel?.id, language]);

  // Return hotel data with translations applied, graceful fallback to original content
  const translatedHotel = hotel && translation ? {
    ...hotel,
    name: translation.translated_name || hotel.name,
    description: translation.translated_description || hotel.description,
    ideal_guests: translation.translated_ideal_guests || hotel.ideal_guests,
    atmosphere: translation.translated_atmosphere || hotel.atmosphere,
    perfect_location: translation.translated_perfect_location || hotel.perfect_location,
  } : hotel;

  console.log('useHotelDetailWithTranslations - Final hotel data:', {
    originalName: hotel?.name,
    translatedName: translatedHotel?.name,
    hasTranslation: !!translation,
    language
  });

  return {
    data: translatedHotel,
    isLoading: isLoading || translationLoading,
    error,
    hasTranslation: !!translation,
    translationStatus: translation?.translation_status,
  };
};
