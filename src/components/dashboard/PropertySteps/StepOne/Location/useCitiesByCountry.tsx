
import { useState, useEffect } from 'react';
import { Country, City } from 'country-state-city';

export function useCitiesByCountry(selectedCountry: string) {
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [customCountry, setCustomCountry] = useState(false);
  const [customCity, setCustomCity] = useState(false);
  const [customCountryName, setCustomCountryName] = useState('');
  const [customCityName, setCustomCityName] = useState('');

  // Load all countries on mount
  useEffect(() => {
    const countryList = Country.getAllCountries();
    setCountries(countryList);
  }, []);

  // Load cities when country changes
  useEffect(() => {
    if (selectedCountry) {
      // Get cities for the selected country
      const cityList = City.getCitiesOfCountry(selectedCountry);
      setCities(cityList || []);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  return {
    countries,
    cities,
    customCountry, 
    setCustomCountry,
    customCity, 
    setCustomCity,
    customCountryName, 
    setCustomCountryName,
    customCityName, 
    setCustomCityName
  };
}
