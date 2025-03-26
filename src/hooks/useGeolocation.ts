
import { useState, useEffect } from 'react';

type GeolocationInfo = {
  country: string;
  countryCode: string;
  currency: string;
  language: string;
  loading: boolean;
  error: string | null;
};

export const useGeolocation = () => {
  const [geoInfo, setGeoInfo] = useState<GeolocationInfo>({
    country: '',
    countryCode: '',
    currency: 'USD',
    language: 'en',
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchGeoInfo = async () => {
      try {
        // Use ipapi.co for IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        
        // Map currency code based on country
        let currencyCode = data.currency || 'USD';
        
        // Map language code based on country/location
        let languageCode = 'en';
        
        // Simple mapping of common countries to languages
        if (data.country_code) {
          switch(data.country_code.toLowerCase()) {
            case 'es':
            case 'mx':
            case 'ar':
            case 'co':
            case 'pe':
            case 'cl':
              languageCode = 'es';
              break;
            case 'fr':
            case 'be':
            case 'ch':
              languageCode = 'fr';
              break;
            case 'de':
            case 'at':
              languageCode = 'de';
              break;
            case 'it':
              languageCode = 'it';
              break;
            default:
              languageCode = 'en';
          }
        }
        
        setGeoInfo({
          country: data.country_name || '',
          countryCode: data.country_code || '',
          currency: currencyCode,
          language: languageCode,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error detecting location:', error);
        setGeoInfo(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to detect location'
        }));
      }
    };

    fetchGeoInfo();
  }, []);

  return geoInfo;
};
