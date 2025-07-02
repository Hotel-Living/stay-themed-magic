
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FilterData {
  countries: Array<{ code: string; name: string; flag: string }>;
  cities: string[];
  loading: boolean;
  error: string | null;
}

// Official base countries - Complete list of 47 countries
const OFFICIAL_BASE_COUNTRIES = [
  'Argentina', 'Germany', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Colombia', 
  'Costa Rica', 'Croatia', 'Denmark', 'Egypt', 'Spain', 'United States', 'Estonia', 'Philippines', 
  'Finland', 'France', 'Greece', 'Hungary', 'Indonesia', 'Ireland', 'Iceland', 'Italy', 'Japan', 
  'Luxembourg', 'Malaysia', 'Malta', 'Morocco', 'Mexico', 'Norway', 'New Zealand', 'Netherlands', 
  'Poland', 'Portugal', 'United Kingdom', 'Czech Republic', 'Romania', 'Sri Lanka', 'South Africa', 
  'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'Uruguay', 'Vietnam', 'South Korea'
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
          
          // Map country names to display format with flags - Complete 47 countries
          const countryMap: Record<string, { name: string; flag: string; code: string }> = {
            'Argentina': { name: 'Argentina', flag: '🇦🇷', code: 'AR' },
            'Germany': { name: 'Germany', flag: '🇩🇪', code: 'DE' },
            'Australia': { name: 'Australia', flag: '🇦🇺', code: 'AU' },
            'Austria': { name: 'Austria', flag: '🇦🇹', code: 'AT' },
            'Belgium': { name: 'Belgium', flag: '🇧🇪', code: 'BE' },
            'Brazil': { name: 'Brazil', flag: '🇧🇷', code: 'BR' },
            'Canada': { name: 'Canada', flag: '🇨🇦', code: 'CA' },
            'Colombia': { name: 'Colombia', flag: '🇨🇴', code: 'CO' },
            'Costa Rica': { name: 'Costa Rica', flag: '🇨🇷', code: 'CR' },
            'Croatia': { name: 'Croatia', flag: '🇭🇷', code: 'HR' },
            'Denmark': { name: 'Denmark', flag: '🇩🇰', code: 'DK' },
            'Egypt': { name: 'Egypt', flag: '🇪🇬', code: 'EG' },
            'Spain': { name: 'Spain', flag: '🇪🇸', code: 'ES' },
            'United States': { name: 'United States', flag: '🇺🇸', code: 'US' },
            'Estonia': { name: 'Estonia', flag: '🇪🇪', code: 'EE' },
            'Philippines': { name: 'Philippines', flag: '🇵🇭', code: 'PH' },
            'Finland': { name: 'Finland', flag: '🇫🇮', code: 'FI' },
            'France': { name: 'France', flag: '🇫🇷', code: 'FR' },
            'Greece': { name: 'Greece', flag: '🇬🇷', code: 'GR' },
            'Hungary': { name: 'Hungary', flag: '🇭🇺', code: 'HU' },
            'Indonesia': { name: 'Indonesia', flag: '🇮🇩', code: 'ID' },
            'Ireland': { name: 'Ireland', flag: '🇮🇪', code: 'IE' },
            'Iceland': { name: 'Iceland', flag: '🇮🇸', code: 'IS' },
            'Italy': { name: 'Italy', flag: '🇮🇹', code: 'IT' },
            'Japan': { name: 'Japan', flag: '🇯🇵', code: 'JP' },
            'Luxembourg': { name: 'Luxembourg', flag: '🇱🇺', code: 'LU' },
            'Malaysia': { name: 'Malaysia', flag: '🇲🇾', code: 'MY' },
            'Malta': { name: 'Malta', flag: '🇲🇹', code: 'MT' },
            'Morocco': { name: 'Morocco', flag: '🇲🇦', code: 'MA' },
            'Mexico': { name: 'Mexico', flag: '🇲🇽', code: 'MX' },
            'Norway': { name: 'Norway', flag: '🇳🇴', code: 'NO' },
            'New Zealand': { name: 'New Zealand', flag: '🇳🇿', code: 'NZ' },
            'Netherlands': { name: 'Netherlands', flag: '🇳🇱', code: 'NL' },
            'Poland': { name: 'Poland', flag: '🇵🇱', code: 'PL' },
            'Portugal': { name: 'Portugal', flag: '🇵🇹', code: 'PT' },
            'United Kingdom': { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
            'Czech Republic': { name: 'Czech Republic', flag: '🇨🇿', code: 'CZ' },
            'Romania': { name: 'Romania', flag: '🇷🇴', code: 'RO' },
            'Sri Lanka': { name: 'Sri Lanka', flag: '🇱🇰', code: 'LK' },
            'South Africa': { name: 'South Africa', flag: '🇿🇦', code: 'ZA' },
            'Sweden': { name: 'Sweden', flag: '🇸🇪', code: 'SE' },
            'Switzerland': { name: 'Switzerland', flag: '🇨🇭', code: 'CH' },
            'Thailand': { name: 'Thailand', flag: '🇹🇭', code: 'TH' },
            'Turkey': { name: 'Turkey', flag: '🇹🇷', code: 'TR' },
            'Uruguay': { name: 'Uruguay', flag: '🇺🇾', code: 'UY' },
            'Vietnam': { name: 'Vietnam', flag: '🇻🇳', code: 'VN' },
            'South Korea': { name: 'South Korea', flag: '🇰🇷', code: 'KR' },
            // Legacy mappings for existing database countries that use codes or alternative names
            'es': { name: 'Spain', flag: '🇪🇸', code: 'ES' },
            'FR': { name: 'France', flag: '🇫🇷', code: 'FR' },
            'GR': { name: 'Greece', flag: '🇬🇷', code: 'GR' },
            'PT': { name: 'Portugal', flag: '🇵🇹', code: 'PT' },
            'TR': { name: 'Turkey', flag: '🇹🇷', code: 'TR' }
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
