
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';

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
          apiKey = data?.apiKey;
          
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
          
          // Only show toast if not on add-property page
          if (!location.pathname.includes('/add-property')) {
            toast({
              title: "Maps Loaded",
              description: "Google Maps integration is ready to use.",
            });
          }
        };
        
        script.onerror = (e) => {
          console.error('Error loading Google Maps script:', e);
          setError("Failed to load Google Maps. Please check your internet connection or API key.");
          setIsLoading(false);
          
          // Only show toast if not on add-property page
          if (!location.pathname.includes('/add-property')) {
            toast({
              title: "Maps Error",
              description: "Failed to load Google Maps. Please check console for details.",
              variant: "destructive",
            });
          }
        };
        
        document.head.appendChild(script);
      } catch (err) {
        console.error('Error in loadGoogleMapsScript:', err);
        setError(err.message || 'Failed to initialize Google Maps');
        setIsLoading(false);
        
        // Only show toast if not on add-property page
        if (!location.pathname.includes('/add-property')) {
          toast({
            title: "Maps Error",
            description: err.message || "Failed to initialize Google Maps",
            variant: "destructive",
          });
        }
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
