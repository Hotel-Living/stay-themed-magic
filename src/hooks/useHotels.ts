
import { useEffect, useState } from 'react';
import { FilterState } from '@/components/filters/FilterTypes';
import { fetchHotelsWithFilters, convertHotelToUIFormat } from '@/services/hotelService';
import { createDefaultFilters, updateFiltersState } from '@/utils/filterUtils';

// Updated interface to match the actual database structure
interface HotelCardData {
  id: string;
  name: string;
  location: string;
  city?: string;
  country?: string;
  price_per_month: number;
  thumbnail?: string;
  theme?: string;
  category?: number;
  hotel_images?: Array<{ image_url: string, is_main?: boolean }>;
  hotel_themes?: Array<{ themes?: { name: string } }>;
  available_months?: string[];
  features_hotel?: any;
  features_room?: any;
  meal_plans?: string[];
  stay_lengths?: number[];
  atmosphere?: string;
  property_type?: string;
  style?: string;
  hotel_activities?: Array<{ activities?: { name: string } }>;
}

interface UseHotelsProps {
  initialFilters?: FilterState;
}

export const useHotels = ({ initialFilters }: UseHotelsProps = {}) => {
  const [hotels, setHotels] = useState<HotelCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || createDefaultFilters()
  );

  useEffect(() => {
    const getHotels = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchHotelsWithFilters(filters);
        
        // Convert API hotel data to UI format with proper location field
        const validHotels = (data || [])
          .filter(hotel => hotel && typeof hotel === 'object' && hotel.id && hotel.name)
          .map(hotel => {
            // Add location property by combining city and country
            const location = `${hotel.city || ''}, ${hotel.country || ''}`.replace(/^,\s*|,\s*$/g, '');
            
            // Convert available_months from string to array if needed - with explicit type handling
            let availableMonths: string[] = [];
            const availableMonthsField = hotel.available_months;
            
            if (availableMonthsField !== null && availableMonthsField !== undefined) {
              if (Array.isArray(availableMonthsField)) {
                availableMonths = availableMonthsField.filter((m: unknown): m is string => 
                  typeof m === 'string' && m.trim().length > 0
                );
              } else if (typeof availableMonthsField === 'string') {
                const trimmedField = availableMonthsField.trim();
                if (trimmedField.length > 0) {
                  const splitMonths = trimmedField.split(',');
                  availableMonths = splitMonths
                    .map((month) => (month as string).trim())
                    .filter((month) => month.length > 0);
                }
              }
            }
            
            return {
              id: hotel.id,
              name: hotel.name,
              location,
              city: hotel.city,
              country: hotel.country,
              price_per_month: hotel.price_per_month || 0,
              thumbnail: hotel.main_image_url || hotel.hotel_images?.find(img => img.is_main)?.image_url,
              theme: hotel.hotel_themes?.[0]?.themes?.name,
              category: hotel.category,
              hotel_images: hotel.hotel_images,
              hotel_themes: hotel.hotel_themes,
              hotel_activities: hotel.hotel_activities,
              available_months: availableMonths,
              features_hotel: hotel.features_hotel,
              features_room: hotel.features_room,
              meal_plans: hotel.meal_plans,
              stay_lengths: hotel.stay_lengths,
              atmosphere: hotel.atmosphere,
              property_type: hotel.property_type,
              style: hotel.style,
            } as HotelCardData;
          })
          .filter(hotel => hotel !== null);
          
        console.log(`Processed ${validHotels.length} hotels for display`);
        setHotels(validHotels);
      } catch (err: any) {
        console.error("Error fetching hotels:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    getHotels();
  }, [filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prevFilters => updateFiltersState(prevFilters, newFilters));
  };

  return {
    hotels,
    loading,
    error,
    filters,
    updateFilters,
  };
};
