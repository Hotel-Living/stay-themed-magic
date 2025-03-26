
import { useState, useEffect } from 'react';

interface GeoLocation {
  country: string;
  countryCode: string;  // Added countryCode
  language: string;     // Added language
  city: string;
  latitude: number;
  longitude: number;
  isLoading: boolean;   // This will replace 'loading'
  error: string | null;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeoLocation>({
    country: '',
    countryCode: '',    // Added countryCode
    language: '',       // Added language
    city: '',
    latitude: 0,
    longitude: 0,
    isLoading: true,    // This will replace 'loading'
    error: null
  });

  // Function to fetch geolocation info from ipapi.co
  const fetchGeoInfo = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/', { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout to prevent long-hanging requests
        signal: AbortSignal.timeout(5000)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setLocation({
        country: data.country_name || '',
        countryCode: data.country_code || '',  // Added from API response
        language: data.languages?.split(',')[0]?.split('-')[0] || 'en',  // Extract first language
        city: data.city || '',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        isLoading: false,
        error: null
      });
    } catch (error: any) {
      // Handle fetch errors gracefully and don't crash the app
      console.error('Error detecting location:', error);
      setLocation({
        country: '',
        countryCode: '',
        language: '',
        city: '',
        latitude: 0,
        longitude: 0,
        isLoading: false,
        error: error?.message || 'Failed to detect location'
      });
    }
  };

  useEffect(() => {
    // Initial fetch of geolocation data
    fetchGeoInfo();
    
    // Cleanup function
    return () => {
      // Nothing to clean up
    };
  }, []);

  return location;
};
