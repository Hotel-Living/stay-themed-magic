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
  hotel_activities?: Array<any>;
  available_months?: string[];
  features_hotel?: Record<string, any>;
  features_room?: Record<string, any>;
  meal_plans?: string[];
  stay_lengths?: number[];
  atmosphere?: string;
  property_type?: string;
  style?: string;
  rates?: any;
  room_types?: any;
  pricingMatrix?: any;
}

interface UseHotelsProps {
  initialFilters?: FilterState;
}

export const useHotels = ({ initialFilters }: UseHotelsProps = {}) => {
  console.log('🚀 useHotels: Hook initialized with initialFilters:', initialFilters);
  
  const [hotels, setHotels] = useState<HotelCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<FilterState>(() => {
    const defaultFilters = createDefaultFilters();
    const finalFilters = initialFilters || defaultFilters;
    console.log('🎯 useHotels: Initial filters state:', finalFilters);
    return finalFilters;
  });

  // Add effect to update filters when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      console.log('🔄 useHotels: Received new initialFilters:', initialFilters);
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  useEffect(() => {
    console.log('🔥 useHotels useEffect TRIGGERED, filters:', JSON.stringify(filters, null, 2));
    const getHotels = async () => {
      console.log('🏨 useHotels: Starting hotel fetch with filters:', filters);
      setLoading(true);
      setError(null);

      try {
        console.log('📡 useHotels: Calling fetchHotelsWithFilters...');
        console.log('🔍 DEBUG: Current filters object:', JSON.stringify(filters, null, 2));
        
        // If no specific filters are applied, use a simple query
        const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
          console.log(`🔍 DEBUG: Checking filter ${key}:`, value);
          if (key === 'priceRange' && value === null) return false;
          if (value === null || value === undefined || value === '') return false;
          if (Array.isArray(value) && value.length === 0) return false;
          if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) return false;
          return true;
        });

        console.log('🔍 Has active filters:', hasActiveFilters);
        console.log('🔍 DEBUG: About to call fetchHotelsWithFilters with filters:', filters);
        
        // Add timeout to detect hanging requests
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Hotel fetch timeout after 10 seconds')), 10000);
        });
        
        const fetchPromise = fetchHotelsWithFilters(filters);
        console.log('⏱️ Race between fetch and timeout started');
        
        const data = await Promise.race([fetchPromise, timeoutPromise]) as any[];
        console.log(`📊 useHotels: Received ${data?.length || 0} hotels from API`);
        
        // Convert API hotel data to UI format with better error handling
        const validHotels = (Array.isArray(data) ? data : [])
          .filter(hotel => {
            if (!hotel || typeof hotel !== 'object' || !hotel.id || !hotel.name) {
              console.warn('⚠️ useHotels: Skipping invalid hotel:', hotel);
              return false;
            }
            return true;
          })
          .map(hotel => {
            try {
              const converted = convertHotelToUIFormat(hotel);
              if (!converted) {
                console.warn('⚠️ useHotels: Hotel conversion returned null:', hotel.id);
              }
              return converted;
            } catch (conversionError) {
              console.error('❌ useHotels: Error converting hotel:', hotel.id, conversionError);
              return null;
            }
          })
          .filter(hotel => hotel !== null) as HotelCardData[];
          
        console.log(`✅ useHotels: Processed ${validHotels.length} valid hotels for display`);
        if (validHotels.length > 0) {
          console.log('🏨 useHotels: Sample hotel names:', validHotels.slice(0, 3).map(h => h.name));
        }
        setHotels(validHotels);
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
    console.log('🔄 useHotels: Current filters:', filters);
    const updatedFilters = updateFiltersState(filters, newFilters);
    console.log('📋 useHotels: Final filter state will be:', updatedFilters);
    
    // Log specific filter values for debugging
    if (updatedFilters.country) {
      console.log(`🌍 useHotels: Country filter set to: ${updatedFilters.country}`);
    }
    if (updatedFilters.month) {
      console.log(`🗓️ useHotels: Month filter set to: ${updatedFilters.month}`);
    }
    if (updatedFilters.theme) {
      console.log(`🎯 useHotels: Theme filter set to: ${updatedFilters.theme.name} (ID: ${updatedFilters.theme.id})`);
    }
    if (updatedFilters.maxPrice) {
      console.log(`💰 useHotels: Max price filter set to: ${updatedFilters.maxPrice}`);
    }
    
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