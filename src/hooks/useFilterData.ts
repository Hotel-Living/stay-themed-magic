
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface Theme {
  id: string;
  name: string;
}

interface Activity {
  id: string;
  name: string;
}

export const useFilterData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch unique countries from hotels
        const { data: hotelsData, error: hotelsError } = await supabase
          .from('hotels')
          .select('country, city')
          .eq('status', 'approved');

        if (hotelsError) throw hotelsError;

        // Process countries and cities
        const uniqueCountries = new Set<string>();
        const uniqueCities = new Set<string>();

        hotelsData?.forEach(hotel => {
          if (hotel.country) {
            uniqueCountries.add(hotel.country);
          }
          if (hotel.city) {
            uniqueCities.add(hotel.city);
          }
        });

        // Create properly formatted countries list
        const formattedCountries: Country[] = Array.from(uniqueCountries)
          .map(countryCode => {
            const countryNames: Record<string, string> = {
              'ES': 'España',
              'FR': 'Francia', 
              'IT': 'Italia',
              'US': 'Estados Unidos',
              'EG': 'Egipto',
              'TR': 'Turquía',
              'GB': 'Reino Unido',
              'DE': 'Alemania',
              'PT': 'Portugal',
              'GR': 'Grecia',
              'BR': 'Brasil',
              'CA': 'Canadá',
              'MX': 'México',
              'AR': 'Argentina',
              'CO': 'Colombia',
              'RO': 'Rumania',
              'AU': 'Australia',
              'NZ': 'Nueva Zelanda',
              'ZA': 'Sudáfrica',
              'MA': 'Marruecos',
              'TH': 'Tailandia',
              'ID': 'Indonesia',
              'VN': 'Vietnam',
              'PH': 'Filipinas',
              'HU': 'Hungría',
              'IS': 'Islandia',
              'FI': 'Finlandia',
              'BE': 'Bélgica',
              'NL': 'Países Bajos',
              'CH': 'Suiza',
              'AT': 'Austria',
              'NO': 'Noruega',
              'SE': 'Suecia',
              'DK': 'Dinamarca',
              'PL': 'Polonia',
              'CZ': 'República Checa',
              'SK': 'Eslovaquia',
              'SI': 'Eslovenia',
              'HR': 'Croacia',
              'BG': 'Bulgaria',
              'EE': 'Estonia',
              'LV': 'Letonia',
              'LT': 'Lituania',
              'IE': 'Irlanda',
              'LU': 'Luxemburgo',
              'MT': 'Malta',
              'CY': 'Chipre'
            };

            return {
              code: countryCode,
              name: countryNames[countryCode] || countryCode,
              flag: ''
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        // Set cities as sorted array
        const sortedCities = Array.from(uniqueCities).sort();

        // Fetch themes
        const { data: themesData, error: themesError } = await supabase
          .from('themes')
          .select('id, name')
          .order('name');

        if (themesError) throw themesError;

        // Fetch activities
        const { data: activitiesData, error: activitiesError } = await supabase
          .from('activities')
          .select('id, name')
          .order('name');

        if (activitiesError) throw activitiesError;

        setCountries(formattedCountries);
        setCities(sortedCities);
        setThemes(themesData || []);
        setActivities(activitiesData || []);
      } catch (err) {
        console.error('Error fetching filter data:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    countries,
    cities,
    themes,
    activities,
    loading,
    error
  };
};
