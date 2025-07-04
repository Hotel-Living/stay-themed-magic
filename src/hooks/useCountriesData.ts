
import { useState, useEffect } from 'react';

interface Country {
  code: string;
  name: string;
  cities: string[];
}

interface CountriesData {
  countries: Country[];
}

export const useCountriesData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountriesData = async () => {
      try {
        const response = await fetch('/src/data/countries.json');
        if (!response.ok) {
          throw new Error('Failed to load countries data');
        }
        const data: CountriesData = await response.json();
        setCountries(data.countries);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load countries');
      } finally {
        setIsLoading(false);
      }
    };

    loadCountriesData();
  }, []);

  const getCountryByCode = (code: string): Country | undefined => {
    return countries.find(country => country.code === code);
  };

  const getCitiesForCountry = (countryCode: string): string[] => {
    const country = getCountryByCode(countryCode);
    return country ? country.cities : [];
  };

  return {
    countries,
    isLoading,
    error,
    getCountryByCode,
    getCitiesForCountry
  };
};
