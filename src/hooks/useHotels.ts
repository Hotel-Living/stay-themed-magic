
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FilterState } from '@/components/filters';

interface UseHotelsProps {
  initialFilters?: FilterState;
}

export const useHotels = ({ initialFilters }: UseHotelsProps = {}) => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters || {
    searchTerm: '',
    theme: null,
    country: null,
    month: null,
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
          .select('*, hotel_images(*), hotel_themes(theme_id, themes:themes(*))');

        if (filters.searchTerm) {
          query = query.ilike('name', `%${filters.searchTerm}%`);
        }

        if (filters.theme) {
          query = query.contains('themes', [filters.theme]);
        }

        if (filters.country) {
          query = query.eq('country', filters.country);
        }

        if (filters.month) {
          query = query.contains('available_months', [filters.month]);
        }

        if (filters.minPrice !== undefined || (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.min !== undefined)) {
          const minPrice = filters.minPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.min : 0);
          query = query.gte('price_per_month', minPrice);
        }

        if (filters.maxPrice !== undefined || (filters.priceRange && typeof filters.priceRange === 'object' && filters.priceRange.max !== undefined)) {
          const maxPrice = filters.maxPrice || (typeof filters.priceRange === 'object' ? filters.priceRange.max : 1000);
          query = query.lte('price_per_month', maxPrice);
        }

        // Handle numeric priceRange (for dropdown selection)
        if (typeof filters.priceRange === 'number') {
          if (filters.priceRange > 2000) {
            query = query.gte('price_per_month', 2000);
          } else {
            query = query.lte('price_per_month', filters.priceRange);
          }
        }

        if (filters.stars && filters.stars.length > 0) {
          query = query.in('category', filters.stars);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) {
          console.error("Supabase error:", supabaseError);
          setError(`Failed to fetch hotels: ${supabaseError.message}`);
        } else {
          setHotels(data || []);
        }
      } catch (err: any) {
        console.error("Unexpected error:", err);
        setError(`An unexpected error occurred: ${err.message}`);
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
