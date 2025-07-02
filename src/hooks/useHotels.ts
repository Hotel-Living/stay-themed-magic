
import { useEffect, useState } from 'react';
import { FilterState } from '@/components/filters/FilterTypes';
import { fetchHotelsWithFilters, convertHotelToUIFormat } from '@/services/hotelService';
import { createDefaultFilters, updateFiltersState } from '@/utils/filterUtils';

// Expanded interface to include all needed properties
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
      console.log('🏨 useHotels: Starting hotel fetch with filters:', filters);
      setLoading(true);
      setError(null);

      try {
        console.log('📡 useHotels: Calling fetchHotelsWithFilters...');
        const data = await fetchHotelsWithFilters(filters);
        console.log(`📊 useHotels: Received ${data?.length || 0} hotels from API`);
        
        // Convert API hotel data to UI format
        const validHotels = (data || [])
          .filter(hotel => hotel && typeof hotel === 'object' && hotel.id && hotel.name)
          .map(hotel => convertHotelToUIFormat(hotel))
          .filter(hotel => hotel !== null);
          
        console.log(`✅ useHotels: Processed ${validHotels.length} valid hotels for display`);
        console.log('🏨 useHotels: Sample hotel names:', validHotels.slice(0, 3).map(h => h.name));
        setHotels(validHotels as HotelCardData[]);
      } catch (err: any) {
        console.error("❌ useHotels: Error fetching hotels:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
        console.log('🏁 useHotels: Hotel fetch completed');
      }
    };

    getHotels();
  }, [filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    console.log('🔄 useHotels: Updating filters with:', newFilters);
    const updatedFilters = updateFiltersState(filters, newFilters);
    console.log('📋 useHotels: Final filter state:', updatedFilters);
    setFilters(updatedFilters);
  };

  return {
    hotels,
    loading,
    error,
    filters,
    updateFilters,
  };
};
