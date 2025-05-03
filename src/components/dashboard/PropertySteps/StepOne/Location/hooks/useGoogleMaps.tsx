
import { useEffect, useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [scriptAdded, setScriptAdded] = useState(false);
  const location = useLocation();

  const loadGoogleMapsScript = useCallback(async () => {
    try {
      // Check if script is already loaded
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        console.log('Google Maps script already loaded');
        setIsLoading(false);
        setError(null);
        return true;
      }

      // Check if we already have the API key cached
      if (!apiKey) {
        console.log('Fetching Google Maps API key from edge function');
        const { data, error: fetchError } = await supabase.functions.invoke('get-maps-key');
        
        let key;
        
        if (fetchError) {
          console.error('Error from edge function:', fetchError);
          console.log('Falling back to environment variable API key');
          key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
          
          if (!key) {
            throw new Error('Failed to fetch API key and no fallback available');
          } else {
            console.log('Successfully retrieved API key from environment variable');
            setApiKey(key);
          }
        } else {
          console.log('Edge function response:', data);
          // Check both key and apiKey properties as the function might use either
          key = data?.key || data?.apiKey;
          
          if (!key) {
            console.error('No API key returned from edge function');
            console.log('Falling back to environment variable API key');
            key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            
            if (!key) {
              throw new Error('API key not found in response and no fallback available');
            } else {
              console.log('Successfully retrieved API key from environment variable');
              setApiKey(key);
            }
          } else {
            console.log('Successfully retrieved API key from edge function');
            setApiKey(key);
          }
        }
      }

      if (!apiKey || apiKey === 'undefined' || apiKey === '') {
        throw new Error('Invalid API key: empty or undefined');
      }

      if (scriptAdded) {
        console.log('Script already being added, waiting...');
        return true;
      }

      console.log('Loading Google Maps script with API key');
      setScriptAdded(true);
      
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.id = 'google-maps-script';
        
        script.onload = () => {
          console.log('Google Maps script loaded successfully');
          setIsLoading(false);
          setError(null);
          setScriptAdded(false);
          resolve(true);
        };
        
        script.onerror = (e) => {
          console.error('Error loading Google Maps script:', e);
          const errorMessage = "Failed to load Google Maps. Please check your internet connection or API key configuration. Make sure the API key has the correct domain restrictions.";
          setError(errorMessage);
          toast.error(errorMessage);
          setIsLoading(false);
          setScriptAdded(false);
          resolve(false);
        };
        
        document.head.appendChild(script);
      });
    } catch (err: any) {
      console.error('Error in loadGoogleMapsScript:', err);
      const errorMessage = err.message || 'Failed to initialize Google Maps';
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
      setScriptAdded(false);
      return false;
    }
  }, [apiKey, scriptAdded]);
  
  useEffect(() => {
    // Clean up any existing scripts first to prevent conflicts
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      console.log('Removing existing Google Maps script before loading a new one');
      existingScript.remove();
    }
    
    loadGoogleMapsScript();
    
    return () => {
      // Only remove if we're navigating away from the page
      if (document.getElementById('google-maps-script')) {
        console.log('Cleaning up Google Maps script on unmount');
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
    
    // Set API key to null to force refetching
    setApiKey(null);
    setScriptAdded(false);
    
    // Then try loading again
    loadGoogleMapsScript();
  }, [loadGoogleMapsScript]);

  return { isLoading, error, retryLoading };
};
