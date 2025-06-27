
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FilterData {
  countries: Array<{ code: string; name: string; flag: string }>;
  cities: string[];
  loading: boolean;
  error: string | null;
}

// Country name and flag mappings
const countryMappings: Record<string, { name: string; flag: string }> = {
  'ES': { name: 'Spain', flag: '🇪🇸' },
  'FR': { name: 'France', flag: '🇫🇷' },
  'IT': { name: 'Italy', flag: '🇮🇹' },
  'US': { name: 'USA', flag: '🇺🇸' },
  'EG': { name: 'Egypt', flag: '🇪🇬' },
  'TR': { name: 'Turkey', flag: '🇹🇷' },
  'GB': { name: 'United Kingdom', flag: '🇬🇧' },
  'DE': { name: 'Germany', flag: '🇩🇪' },
  'PT': { name: 'Portugal', flag: '🇵🇹' },
  'GR': { name: 'Greece', flag: '🇬🇷' }
};

export const useFilterData = (): FilterData => {
  const [countries, setCountries] = useState<Array<{ code: string; name: string; flag: string }>>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the new dynamic function to get countries
        const { data: countriesData, error: countriesError } = await supabase.rpc('get_unique_countries');
        
        if (countriesError) {
          throw countriesError;
        }

        // Get cities using the existing method for backward compatibility
        const { data: citiesData, error: citiesError } = await supabase.rpc('get_cities_by_country');
        
        if (citiesError) {
          throw citiesError;
        }

        if (countriesData) {
          const countryList = countriesData.map(item => {
            const countryCode = item.country_code;
            return {
              code: countryCode,
              name: countryMappings[countryCode]?.name || countryCode,
              flag: countryMappings[countryCode]?.flag || '🏳️'
            };
          }).sort((a, b) => a.name.localeCompare(b.name));

          setCountries(countryList);
        }

        if (citiesData) {
          const uniqueCities = [...new Set(citiesData.map(item => item.city_name))]
            .filter(city => city && city.trim() !== '')
            .sort();

          setCities(uniqueCities);
        }
      } catch (err) {
        console.error('Error fetching filter data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();

    // Set up real-time subscription for changes
    const channel = supabase
      .channel('legacy-filter-data-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hotels' }, () => {
        console.log('Hotels data changed, refreshing legacy filter data');
        fetchFilterData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { countries, cities, loading, error };
};
