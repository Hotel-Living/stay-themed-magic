
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
    if (!hotel?.id || language === 'en') {
      setTranslation(null);
      return;
    }

    const fetchTranslation = async () => {
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

  // Return hotel data with translations applied
  const translatedHotel = hotel && translation ? {
    ...hotel,
    name: translation.translated_name || hotel.name,
    description: translation.translated_description || hotel.description,
    ideal_guests: translation.translated_ideal_guests || hotel.ideal_guests,
    atmosphere: translation.translated_atmosphere || hotel.atmosphere,
    perfect_location: translation.translated_perfect_location || hotel.perfect_location,
  } : hotel;

  return {
    data: translatedHotel,
    isLoading: isLoading || translationLoading,
    error,
    hasTranslation: !!translation,
    translationStatus: translation?.translation_status,
  };
};
