
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      try {
        const existingScript = document.getElementById('google-maps-script');
        if (existingScript) return;

        console.log('Fetching Google Maps API key from edge function')
        const { data, error: fetchError } = await supabase.functions.invoke('get-maps-key');
        
        if (fetchError) {
          console.error('Error from edge function:', fetchError)
          throw new Error(fetchError.message || 'Failed to fetch API key')
        }
        
        if (!data?.apiKey) {
          console.error('No API key returned from edge function')
          throw new Error('API key not found in response')
        }

        console.log('Successfully retrieved API key, loading Google Maps script')
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.id = 'google-maps-script';
        
        script.onload = () => {
          console.log('Google Maps script loaded successfully')
          setIsLoading(false);
        };
        
        script.onerror = (e) => {
          console.error('Error loading Google Maps script:', e)
          setError("Failed to load Google Maps. Please check your internet connection.");
          setIsLoading(false);
        };
        
        document.head.appendChild(script);
      } catch (err) {
        console.error('Error in loadGoogleMapsScript:', err)
        setError(err.message || 'Failed to initialize Google Maps');
        setIsLoading(false);
      }
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
