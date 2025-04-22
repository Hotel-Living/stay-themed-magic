
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

        // Fetch API key from our edge function
        const { data, error: fetchError } = await supabase.functions.invoke('get-maps-key');
        
        if (fetchError || !data?.apiKey) {
          throw new Error(fetchError?.message || 'Failed to fetch API key');
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.id = 'google-maps-script';
        
        script.onload = () => setIsLoading(false);
        script.onerror = () => {
          setError("Failed to load Google Maps. Please check your internet connection.");
          setIsLoading(false);
        };
        
        document.head.appendChild(script);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to initialize Google Maps');
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
