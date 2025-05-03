
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      try {
        // Check if script is already loaded
        const existingScript = document.getElementById('google-maps-script');
        if (existingScript) {
          console.log('Google Maps script already loaded');
          setIsLoading(false);
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
            }
          }
        }

        console.log('Successfully retrieved API key, loading Google Maps script');
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.id = 'google-maps-script';
        
        script.onload = () => {
          console.log('Google Maps script loaded successfully');
          setIsLoading(false);
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
    };
    
    loadGoogleMapsScript();
    
    return () => {
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        console.log('Removing Google Maps script');
        existingScript.remove();
      }
    };
  }, [location.pathname]);

  return { isLoading, error };
};
