import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/types/hotel';
import { FilterState } from '@/components/filters';

interface UseHotelsProps {
  initialFilters?: FilterState;
}

export const useHotels = ({ initialFilters }: UseHotelsProps = {}) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters || {
    searchTerm: '',
    theme: '',
    minPrice: 0,
    maxPrice: 1000,
    stars: [],
  });

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('hotels')
          .select('*');

        if (filters.searchTerm) {
          query = query.ilike('name', `%${filters.searchTerm}%`);
        }

        if (filters.theme) {
          query = query.contains('themes', [filters.theme]);
        }

        if (filters.minPrice !== undefined) {
          query = query.gte('price_per_month', filters.minPrice);
        }

        if (filters.maxPrice !== undefined) {
          query = query.lte('price_per_month', filters.maxPrice);
        }

        if (filters.stars && filters.stars.length > 0) {
          query = query.in('stars', filters.stars);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Supabase error:", error);
          setError(`Failed to fetch hotels: ${error.message}`);
        } else {
          setHotels(data as Hotel[]);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError(`An unexpected error occurred: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return {
    hotels,
    loading,
    error,
    filters,
    updateFilters,
  };
};
