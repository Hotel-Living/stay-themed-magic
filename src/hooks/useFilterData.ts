
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FilterData {
  countries: Array<{ code: string; name: string; flag: string }>;
  cities: string[];
  loading: boolean;
  error: string | null;
}

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

        // Fetch unique countries and cities from hotels table
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('country, city')
          .eq('status', 'approved'); // Only show approved hotels

        if (hotelError) {
          throw hotelError;
        }

        if (hotelData) {
          // Extract unique countries with their ISO codes
          const uniqueCountryCodes = [...new Set(hotelData.map(hotel => hotel.country))];
          const countryList = uniqueCountryCodes.map(countryCode => {
            // Map country codes to display names and flags
            const countryMap: Record<string, { name: string; flag: string }> = {
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

            return {
              code: countryCode,
              name: countryMap[countryCode]?.name || countryCode,
              flag: countryMap[countryCode]?.flag || '🏳️'
            };
          }).sort((a, b) => a.name.localeCompare(b.name));

          // Extract unique cities
          const uniqueCities = [...new Set(hotelData.map(hotel => hotel.city))]
            .filter(city => city && city.trim() !== '')
            .sort();

          setCountries(countryList);
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
  }, []);

  return { countries, cities, loading, error };
};
