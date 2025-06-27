
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
  features_hotel?: Record<string, boolean>;
  features_room?: Record<string, boolean>;
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
            
            // Convert available_months from string to array if needed - with proper type checking
            let availableMonths: string[] = [];
            if (hotel.available_months) {
              if (Array.isArray(hotel.available_months)) {
                availableMonths = hotel.available_months.filter(m => typeof m === 'string' && m.trim());
              } else if (typeof hotel.available_months === 'string') {
                availableMonths = hotel.available_months.split(',').filter(m => m.trim());
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
