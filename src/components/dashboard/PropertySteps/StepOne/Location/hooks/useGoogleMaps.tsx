
import { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        // Get API key directly from environment variable
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
          throw new Error('Google Maps API key not found');
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
          toast({
            title: "Maps Loaded",
            description: "Google Maps integration is ready to use.",
          });
        };
        
        script.onerror = (e) => {
          console.error('Error loading Google Maps script:', e);
          setError("Failed to load Google Maps. Please check your internet connection or API key.");
          setIsLoading(false);
          toast({
            title: "Maps Error",
            description: "Failed to load Google Maps. Please check console for details.",
            variant: "destructive",
          });
        };
        
        document.head.appendChild(script);
      } catch (err) {
        console.error('Error in loadGoogleMapsScript:', err);
        setError(err.message || 'Failed to initialize Google Maps');
        setIsLoading(false);
        toast({
          title: "Maps Error",
          description: err.message || "Failed to initialize Google Maps",
          variant: "destructive",
        });
      }
    };
    
    loadGoogleMapsScript();
    
    return () => {
      // No need to remove the script on unmount as it should be available globally
    };
  }, []);

  return { isLoading, error };
};
