
import { useEffect, useState } from 'react';

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) return;

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.id = 'google-maps-script';
      
      script.onload = () => setIsLoading(false);
      script.onerror = () => {
        setError("Failed to load Google Maps. Please check your internet connection.");
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
    };
    
    loadGoogleMapsScript();
    
    return () => {
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return { isLoading, error };
};
