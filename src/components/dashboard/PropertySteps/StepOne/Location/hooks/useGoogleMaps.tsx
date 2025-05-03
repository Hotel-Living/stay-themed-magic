
import { useEffect, useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const loadGoogleMapsScript = useCallback(async () => {
    try {
      // Check if script is already loaded
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        console.log('Google Maps script already loaded');
        setIsLoading(false);
        setError(null);
        return;
      }

      console.log('Fetching Google Maps API key from edge function');
      const { data, error: fetchError } = await supabase.functions.invoke('get-maps-key');
      
      let apiKey;
      
      if (fetchError) {
        console.error('Error from edge function:', fetchError);
        console.log('Falling back to environment variable API key');
        apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
          throw new Error('Failed to fetch API key and no fallback available');
        } else {
          console.log('Successfully retrieved API key from environment variable');
        }
      } else {
        console.log('Edge function response:', data);
        // Check both key and apiKey properties as the function might use either
        apiKey = data?.key || data?.apiKey;
        
        if (!apiKey) {
          console.error('No API key returned from edge function');
          console.log('Falling back to environment variable API key');
          apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
          
          if (!apiKey) {
            throw new Error('API key not found in response and no fallback available');
          } else {
            console.log('Successfully retrieved API key from environment variable');
          }
        } else {
          console.log('Successfully retrieved API key from edge function');
        }
      }

      if (!apiKey || apiKey === 'undefined' || apiKey === '') {
        throw new Error('Invalid API key: empty or undefined');
      }

      console.log('Loading Google Maps script with API key');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.id = 'google-maps-script';
      
      script.onload = () => {
        console.log('Google Maps script loaded successfully');
        setIsLoading(false);
        setError(null);
      };
      
      script.onerror = (e) => {
        console.error('Error loading Google Maps script:', e);
        const errorMessage = "Failed to load Google Maps. Please check your internet connection or API key configuration. Make sure the API key has the correct domain restrictions.";
        setError(errorMessage);
        toast.error(errorMessage);
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
    } catch (err: any) {
      console.error('Error in loadGoogleMapsScript:', err);
      const errorMessage = err.message || 'Failed to initialize Google Maps';
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    loadGoogleMapsScript();
    
    return () => {
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        console.log('Removing Google Maps script');
        existingScript.remove();
      }
    };
  }, [location.pathname, loadGoogleMapsScript]);

  const retryLoading = useCallback(() => {
    console.log('Retrying Google Maps loading');
    setIsLoading(true);
    setError(null);
    
    // First remove existing script if any
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Then try loading again
    loadGoogleMapsScript();
  }, [loadGoogleMapsScript]);

  return { isLoading, error, retryLoading };
};
