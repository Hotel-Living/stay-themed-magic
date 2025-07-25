import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

interface FilterMapping {
  id: string;
  category: string;
  english_value: string;
  spanish_value: string;
  portuguese_value?: string;
  romanian_value?: string;
}

export const useFilterTranslations = () => {
  const { i18n } = useTranslation();
  const [mappings, setMappings] = useState<FilterMapping[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMappings = async () => {
      try {
        const { data, error } = await supabase
          .from('filter_value_mappings')
          .select('*')
          .eq('is_active', true);
        
        if (error) throw error;
        setMappings(data || []);
      } catch (error) {
        console.error('Error fetching filter mappings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMappings();
  }, []);

  const translateFilterValue = (category: string, value: string): string => {
    const mapping = mappings.find(
      m => m.category === category && 
      (m.spanish_value === value || m.english_value === value || 
       m.portuguese_value === value || m.romanian_value === value)
    );

    if (!mapping) return value;

    // Return translated value based on current language
    switch (i18n.language) {
      case 'en':
        return mapping.english_value;
      case 'es':
        return mapping.spanish_value;
      case 'pt':
        return mapping.portuguese_value || mapping.english_value;
      case 'ro':
        return mapping.romanian_value || mapping.english_value;
      default:
        return mapping.english_value;
    }
  };

  const translateMealPlans = (mealPlans: string[]): string[] => {
    return mealPlans.map(plan => {
      // Handle special cases first
      if (plan === 'Solo alojamiento') {
        switch (i18n.language) {
          case 'en': return 'Room only';
          case 'pt': return 'Apenas acomodação';
          case 'ro': return 'Doar cazare';
          default: return plan;
        }
      }
      if (plan === 'Desayuno') {
        switch (i18n.language) {
          case 'en': return 'Breakfast included';
          case 'pt': return 'Café da manhã incluído';
          case 'ro': return 'Mic dejun inclus';
          default: return plan;
        }
      }
      return translateFilterValue('meal_plans', plan);
    });
  };

  const translateHotelFeatures = (features: string[]): string[] => {
    return features.map(feature => translateFilterValue('hotel_features', feature));
  };

  const translateRoomFeatures = (features: string[]): string[] => {
    return features.map(feature => translateFilterValue('room_features', feature));
  };

  return {
    translateFilterValue,
    translateMealPlans,
    translateHotelFeatures,
    translateRoomFeatures,
    loading
  };
};