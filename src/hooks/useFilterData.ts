
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const OFFICIAL_BASE_COUNTRIES = [
  'Spain', 'France', 'Italy', 'United States', 'Egypt', 'Turkey', 'Germany', 
  'Portugal', 'Greece', 'Brazil', 'Canada', 'Mexico', 'Argentina', 'Colombia', 
  'Romania', 'Australia', 'New Zealand', 'South Africa', 'Morocco', 'Thailand', 
  'Indonesia', 'Vietnam', 'Philippines', 'United Kingdom'
];

export function useFilterData() {
  const [countries, setCountries] = useState<Array<{ code: string; name: string; flag: string }>>([]);
  const [themes, setThemes] = useState<Array<{ id: string; name: string }>>([]);
  const [activities, setActivities] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch unique countries from hotels
        const { data: hotelsData, error: hotelsError } = await supabase
          .from('hotels')
          .select('country')
          .not('country', 'is', null);

        if (hotelsError) {
          throw hotelsError;
        }

        // Extract unique countries from database
        const dbCountries = [...new Set(hotelsData?.map(hotel => hotel.country).filter(Boolean) || [])];
        
        // Combine official base countries with countries from database
        const allCountryNames = [...new Set([...OFFICIAL_BASE_COUNTRIES, ...dbCountries])];
        
        // Comprehensive country mapping with proper names and codes
        const countryMap: Record<string, { name: string; flag: string; code: string }> = {
          'United States': { name: 'United States', flag: '🇺🇸', code: 'US' },
          'Canada': { name: 'Canada', flag: '🇨🇦', code: 'CA' },
          'Mexico': { name: 'Mexico', flag: '🇲🇽', code: 'MX' },
          'Spain': { name: 'Spain', flag: '🇪🇸', code: 'ES' },
          'France': { name: 'France', flag: '🇫🇷', code: 'FR' },
          'Italy': { name: 'Italy', flag: '🇮🇹', code: 'IT' },
          'Germany': { name: 'Germany', flag: '🇩🇪', code: 'DE' },
          'Portugal': { name: 'Portugal', flag: '🇵🇹', code: 'PT' },
          'Romania': { name: 'Romania', flag: '🇷🇴', code: 'RO' },
          'Greece': { name: 'Greece', flag: '🇬🇷', code: 'GR' },
          'Brazil': { name: 'Brazil', flag: '🇧🇷', code: 'BR' },
          'Argentina': { name: 'Argentina', flag: '🇦🇷', code: 'AR' },
          'Colombia': { name: 'Colombia', flag: '🇨🇴', code: 'CO' },
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
          'United Kingdom': { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
          // Additional countries
          'Belgium': { name: 'Belgium', flag: '🇧🇪', code: 'BE' },
          'Finland': { name: 'Finland', flag: '🇫🇮', code: 'FI' },
          'Hungary': { name: 'Hungary', flag: '🇭🇺', code: 'HU' },
          'Iceland': { name: 'Iceland', flag: '🇮🇸', code: 'IS' },
          'Ireland': { name: 'Ireland', flag: '🇮🇪', code: 'IE' },
          'Iran': { name: 'Iran', flag: '🇮🇷', code: 'IR' },
          'Luxembourg': { name: 'Luxembourg', flag: '🇱🇺', code: 'LU' }
        };

        // Create a Set to track unique countries by code to prevent duplicates
        const uniqueCountries = new Map<string, { code: string; name: string; flag: string }>();

        // Process all country names and filter out invalid entries
        allCountryNames.forEach(countryName => {
          // Skip invalid entries (duplicated codes like "BE BE", "FI FI", etc.)
          if (countryName && countryName.includes(' ') && countryName.split(' ').length === 2) {
            const parts = countryName.split(' ');
            if (parts[0] === parts[1] && parts[0].length <= 3) {
              // This is a duplicate code entry like "BE BE", skip it
              console.warn(`Skipping duplicate country code entry: ${countryName}`);
              return;
            }
          }

          // Skip entries that are just country codes (2-3 letter codes in uppercase)
          if (countryName && countryName.length <= 3 && countryName === countryName.toUpperCase() && !countryName.includes(' ')) {
            console.warn(`Skipping standalone country code: ${countryName}`);
            return;
          }

          if (countryMap[countryName]) {
            const mappedCountry = countryMap[countryName];
            if (!uniqueCountries.has(mappedCountry.code)) {
              uniqueCountries.set(mappedCountry.code, {
                code: mappedCountry.code,
                name: mappedCountry.name,
                flag: mappedCountry.flag
              });
            }
          } else {
            // For any unmapped countries from database, only process valid country names
            if (countryName && countryName.length > 3 && !countryName.match(/^[A-Z]{2,3}$/)) {
              // Generate a code from the country name
              const code = countryName.substring(0, 2).toUpperCase();
              if (!uniqueCountries.has(code)) {
                uniqueCountries.set(code, {
                  code: code,
                  name: countryName,
                  flag: '🏳️'
                });
              }
            }
          }
        });

        // Convert to array and sort alphabetically by name
        const countriesArray = Array.from(uniqueCountries.values()).sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countriesArray);

        // Fetch themes
        const { data: themesData, error: themesError } = await supabase
          .from('themes')
          .select('id, name')
          .order('name');

        if (themesError) {
          throw themesError;
        }

        setThemes(themesData || []);

        // Fetch activities
        const { data: activitiesData, error: activitiesError } = await supabase
          .from('activities')
          .select('id, name')
          .order('name');

        if (activitiesError) {
          throw activitiesError;
        }

        setActivities(activitiesData || []);

      } catch (err) {
        console.error('Error fetching filter data:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  return { countries, themes, activities, loading, error };
}
