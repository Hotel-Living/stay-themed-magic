
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
        console.log("Fetching hotels with filters:", filters);
        const data = await fetchHotelsWithFilters(filters);
        console.log("Hotels fetched:", data.length);
        setHotels(data);
      } catch (err: any) {
        console.error("Unexpected error:", err);
        setError(err instanceof Error ? err : new Error(`An unexpected error occurred: ${err}`));
      } finally {
        setLoading(false);
      }
    };

    getHotels();
  }, [filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    console.log("Updating filters:", newFilters);
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
