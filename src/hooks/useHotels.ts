
import { useEffect, useState } from 'react';
import { FilterState } from '@/components/filters/FilterTypes';
import { fetchHotelsWithFilters } from '@/services/hotelService';
import { createDefaultFilters, updateFiltersState } from '@/utils/filterUtils';

interface UseHotelsProps {
  initialFilters?: FilterState;
}

export const useHotels = ({ initialFilters }: UseHotelsProps = {}) => {
  const [hotels, setHotels] = useState<any[]>([]);
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
        // Filter out hotels with invalid data
        const validHotels = data.filter((hotel: any) => 
          hotel && 
          typeof hotel === 'object' &&
          hotel.id &&
          hotel.name
        );
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
