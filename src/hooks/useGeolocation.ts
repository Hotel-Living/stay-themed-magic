
import { useState, useEffect } from 'react';

interface GeoLocation {
  country: string;
  countryCode: string;  
  language: string;     
  city: string;
  latitude: number;
  longitude: number;
  isLoading: boolean;   
  error: string | null;
  isOnline: boolean;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeoLocation>({
    country: '',
    countryCode: '',    
    language: '',       
    city: '',
    latitude: 0,
    longitude: 0,
    isLoading: true,    
    error: null,
    isOnline: navigator.onLine
  });

  // Function to fetch geolocation info from ipapi.co
  const fetchGeoInfo = async () => {
    try {
      // First check if we're online
      if (!navigator.onLine) {
        throw new Error("Network offline");
      }

      // Attempt to fetch geolocation data with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const response = await fetch('https://ipapi.co/json/', { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setLocation({
        country: data.country_name || '',
        countryCode: data.country_code || '',  
        language: data.languages?.split(',')[0]?.split('-')[0] || 'en',  
        city: data.city || '',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        isLoading: false,
        error: null,
        isOnline: true
      });
    } catch (error: any) {
      console.error('Error detecting location:', error);
      
      // Use navigator.language as a fallback for language detection
      const browserLang = navigator.language || 'en';
      const detectedLanguage = browserLang.split('-')[0];
      
      // Provide fallback values when geolocation fails
      setLocation({
        country: 'United States', // Default country
        countryCode: 'US',        // Default country code
        language: detectedLanguage,
        city: '',
        latitude: 0,
        longitude: 0,
        isLoading: false,
        error: error?.message || 'Failed to detect location',
        isOnline: navigator.onLine
      });
    }
  };

  // Network status listener
  useEffect(() => {
    const handleOnline = () => {
      setLocation(prev => ({ ...prev, isOnline: true }));
      fetchGeoInfo(); // Try to fetch again when back online
    };
    
    const handleOffline = () => {
      setLocation(prev => ({ ...prev, isOnline: false }));
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Initial fetch of geolocation data
    fetchGeoInfo();
  }, []);

  return location;
};
