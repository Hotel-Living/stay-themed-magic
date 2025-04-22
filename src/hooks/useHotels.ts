
import { useEffect, useState } from 'react';
import { FilterState } from '@/components/filters/FilterTypes';
import { fetchHotelsWithFilters } from '@/services/hotelService';
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
        // Map DB hotel to UI format used in SearchResultsList
        const validHotels = (data || []).filter(
          (hotel: any) => hotel && typeof hotel === 'object' && hotel.id && hotel.name
        ).map((hotel: any) => ({
          id: hotel.id,
          name: hotel.name,
          location: hotel.city,
          city: hotel.city,  // Keep original properties for FeaturedHotelsSection
          country: hotel.country,
          category: hotel.category,
          price_per_month: hotel.price_per_month,
          // Use `main_image_url` if present, fallback to first hotel_images, fallback to undefined
          thumbnail:
            hotel.main_image_url
              ? hotel.main_image_url
              : hotel.hotel_images && hotel.hotel_images.length > 0
                ? hotel.hotel_images[0].image_url
                : undefined,
          // Include original data structures for FeaturedHotelsSection
          hotel_images: hotel.hotel_images,
          hotel_themes: hotel.hotel_themes,
          available_months: hotel.available_months,
          // Use first theme name if exists
          theme: hotel.hotel_themes && hotel.hotel_themes.length > 0 && hotel.hotel_themes[0].themes
            ? hotel.hotel_themes[0].themes.name
            : undefined,
        }));
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
