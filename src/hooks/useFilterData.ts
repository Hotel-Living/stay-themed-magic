
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FilterData {
  countries: Array<{ code: string; name: string; flag: string }>;
  cities: string[];
  loading: boolean;
  error: string | null;
}

// Official base countries that must always appear
const OFFICIAL_BASE_COUNTRIES = [
  'United States', 'Canada', 'Mexico', 'Argentina', 'Brazil', 'Colombia',
  'Spain', 'Portugal', 'Romania', 'Italy', 'France', 'Germany', 'Greece',
  'Australia', 'New Zealand', 'South Africa', 'Morocco', 'Egypt',
  'Thailand', 'Indonesia', 'Vietnam', 'Philippines'
];

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

        // Fetch unique countries from hotels table (approved hotels only)
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('country, city')
          .eq('status', 'approved');

        if (hotelError) {
          throw hotelError;
        }

        if (hotelData) {
          // Get unique countries from database
          const dbCountries = [...new Set(hotelData.map(hotel => hotel.country))];
          
          // Combine official base countries with countries from database
          const allCountryNames = [...new Set([...OFFICIAL_BASE_COUNTRIES, ...dbCountries])];
          
          // Map country names to display format with flags
          const countryMap: Record<string, { name: string; flag: string; code: string }> = {
            'United States': { name: 'United States', flag: '🇺🇸', code: 'US' },
            'Canada': { name: 'Canada', flag: '🇨🇦', code: 'CA' },
            'Mexico': { name: 'Mexico', flag: '🇲🇽', code: 'MX' },
            'Argentina': { name: 'Argentina', flag: '🇦🇷', code: 'AR' },
            'Brazil': { name: 'Brazil', flag: '🇧🇷', code: 'BR' },
            'Colombia': { name: 'Colombia', flag: '🇨🇴', code: 'CO' },
            'Spain': { name: 'Spain', flag: '🇪🇸', code: 'ES' },
            'Portugal': { name: 'Portugal', flag: '🇵🇹', code: 'PT' },
            'Romania': { name: 'Romania', flag: '🇷🇴', code: 'RO' },
            'Italy': { name: 'Italy', flag: '🇮🇹', code: 'IT' },
            'France': { name: 'France', flag: '🇫🇷', code: 'FR' },
            'Germany': { name: 'Germany', flag: '🇩🇪', code: 'DE' },
            'Greece': { name: 'Greece', flag: '🇬🇷', code: 'GR' },
            'Australia': { name: 'Australia', flag: '🇦🇺', code: 'AU' },
            'New Zealand': { name: 'New Zealand', flag: '🇳🇿', code: 'NZ' },
            'South Africa': { name: 'South Africa', flag: '🇿🇦', code: 'ZA' },
            'Morocco': { name: 'Morocco', flag: '🇲🇦', code: 'MA' },
            'Egypt': { name: 'Egypt', flag: '🇪🇬', code: 'EG' },
            'Thailand': { name: 'Thailand', flag: '🇹🇭', code: 'TH' },
            'Indonesia': { name: 'Indonesia', flag: '🇮🇩', code: 'ID' },
            'Vietnam': { name: 'Vietnam', flag: '🇻🇳', code: 'VN' },
            'Philippines': { name: 'Philippines', flag: '🇵🇭', code: 'PH' },
            // Legacy mappings for existing database countries
            'USA': { name: 'United States', flag: '🇺🇸', code: 'US' },
            'Turkey': { name: 'Turkey', flag: '🇹🇷', code: 'TR' },
            'United Kingdom': { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' }
          };

          const countryList = allCountryNames.map(countryName => {
            const countryInfo = countryMap[countryName];
            if (countryInfo) {
              return {
                code: countryInfo.code,
                name: countryInfo.name,
                flag: countryInfo.flag
              };
            }
            // For any unmapped countries from database, create basic entry
            return {
              code: countryName.toUpperCase().substring(0, 2),
              name: countryName,
              flag: '🏳️'
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
