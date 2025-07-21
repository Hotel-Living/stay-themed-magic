
import { useState, useEffect, useCallback } from 'react';
import { isJotFormPage } from '@/utils/routeUtils';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface UseGoogleMapsProps {
  skipLoading?: boolean;
}

export const useGoogleMaps = ({ skipLoading = false }: UseGoogleMapsProps = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect if we should skip loading due to JotForm conflict
  const shouldSkipLoading = skipLoading || isJotFormPage();

  const loadGoogleMapsScript = useCallback(() => {
    // Skip loading if on JotForm page to prevent API conflicts
    if (shouldSkipLoading) {
      console.log('Skipping Google Maps API loading on JotForm page');
      return;
    }

    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      setError('Google Maps API key not found');
      setIsLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      setError('Failed to load Google Maps API');
      setIsLoading(false);
    };

    document.head.appendChild(script);
  }, [shouldSkipLoading, isLoading]);

  const retryLoading = useCallback(() => {
    if (shouldSkipLoading) return;
    setError(null);
    setIsLoading(false);
    loadGoogleMapsScript();
  }, [loadGoogleMapsScript, shouldSkipLoading]);

  useEffect(() => {
    if (!shouldSkipLoading) {
      loadGoogleMapsScript();
    }
  }, [loadGoogleMapsScript, shouldSkipLoading]);

  return {
    isLoaded: shouldSkipLoading ? false : isLoaded,
    isLoading: shouldSkipLoading ? false : isLoading,
    error: shouldSkipLoading ? null : error,
    retryLoading
  };
};
