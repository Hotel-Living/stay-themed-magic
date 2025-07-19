import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiKeyRef = useRef<string | null>(null);
  const scriptLoadingRef = useRef<boolean>(false);
  const retryTimeoutRef = useRef<number | null>(null);
  const retryCountRef = useRef<number>(0);
  const maxRetries = 3;
  
  // Function to clean up any existing Google Maps scripts
  const cleanupExistingScripts = useCallback(() => {
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      console.log('Removing existing Google Maps script');
      existingScript.remove();
    }
  }, []);
  
  // Primary function to load the Google Maps script
  const loadGoogleMapsScript = useCallback(async (forceRefresh = false) => {
    try {
      // Prevent concurrent loading attempts
      if (scriptLoadingRef.current && !forceRefresh) {
        console.log('Script already being loaded, skipping duplicate request');
        return false;
      }
      
      scriptLoadingRef.current = true;
      setIsLoading(true);
      
      // Clear any existing error state when starting a fresh load attempt
      setError(null);
      
      // Clean up any existing scripts first
      cleanupExistingScripts();
      
      // If we already have an API key cached and aren't forcing a refresh, use it
      if (!forceRefresh && apiKeyRef.current) {
        console.log('Using cached API key');
        return injectGoogleMapsScript(apiKeyRef.current);
      }
      
      // Otherwise fetch a new key
      console.log('Fetching Google Maps API key from edge function');
      const { data, error: fetchError } = await supabase.functions.invoke('get-maps-key');
      
      if (fetchError) {
        console.error('Error from edge function:', fetchError);
        
        // Try fallback to environment variable
        console.log('Falling back to environment variable API key');
        const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        
        if (!envKey) {
          throw new Error('Failed to fetch API key and no fallback available');
        }
        
        console.log('Successfully retrieved API key from environment variable');
        apiKeyRef.current = envKey;
        return injectGoogleMapsScript(envKey);
      }
      
      // Process the response from the edge function
      if (!data) {
        throw new Error('Empty response from edge function');
      }
      
      console.log('Edge function response received');
      
      // Check both key and apiKey properties as the function might use either
      const key = data?.key || data?.apiKey;
      
      if (!key) {
        console.error('No API key returned from edge function');
        
        // Try fallback to environment variable
        const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        
        if (!envKey) {
          throw new Error('API key not found in response and no fallback available');
        }
        
        console.log('Successfully retrieved API key from environment variable');
        apiKeyRef.current = envKey;
        return injectGoogleMapsScript(envKey);
      }
      
      console.log('Successfully retrieved API key from edge function');
      apiKeyRef.current = key;
      return injectGoogleMapsScript(key);
      
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to initialize Google Maps';
      console.error('Error in loadGoogleMapsScript:', errorMessage);
      setError(errorMessage);
      toast.error('Google Maps failed to load. Please check your configuration.');
      setIsLoading(false);
      scriptLoadingRef.current = false;
      return false;
    }
  }, [cleanupExistingScripts]);
  
  // Helper function to inject the script tag
  const injectGoogleMapsScript = useCallback((apiKey: string): Promise<boolean> => {
    if (!apiKey || apiKey === 'undefined' || apiKey === '') {
      setError('Invalid API key: empty or undefined');
      setIsLoading(false);
      scriptLoadingRef.current = false;
      return Promise.resolve(false);
    }
    
    console.log('Adding Google Maps script to document head');
    
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
        scriptLoadingRef.current = false;
        retryCountRef.current = 0; // Reset retry count on successful load
        resolve(true);
      };
      
      script.onerror = (e) => {
        console.error('Error loading Google Maps script:', e);
        const errorMessage = "Failed to load Google Maps. Please check your internet connection or API key configuration. Make sure the API key has the correct domain restrictions.";
        setError(errorMessage);
        setIsLoading(false);
        scriptLoadingRef.current = false;
        
        // Auto-retry logic with backoff
        if (retryCountRef.current < maxRetries) {
          const retryDelay = Math.pow(2, retryCountRef.current) * 1000; // Exponential backoff
          console.log(`Will retry loading in ${retryDelay}ms (attempt ${retryCountRef.current + 1}/${maxRetries})`);
          
          if (retryTimeoutRef.current) {
            window.clearTimeout(retryTimeoutRef.current);
          }
          
          retryTimeoutRef.current = window.setTimeout(() => {
            retryCountRef.current++;
            loadGoogleMapsScript(true); // Force refresh on retry
          }, retryDelay);
        } else {
          console.log(`Maximum retry attempts (${maxRetries}) reached. Giving up.`);
        }
        
        resolve(false);
      };
      
      document.head.appendChild(script);
    });
  }, [loadGoogleMapsScript]);
  
  // Retry handler for manual retry
  const retryLoading = useCallback(() => {
    console.log('Manually retrying Google Maps loading');
    setIsLoading(true);
    setError(null);
    
    // First clear any pending auto-retry
    if (retryTimeoutRef.current) {
      window.clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    
    // Reset retry count for manual retries
    retryCountRef.current = 0;
    
    // Force a fresh API key fetch
    apiKeyRef.current = null;
    loadGoogleMapsScript(true);
  }, [loadGoogleMapsScript]);
  
  // Initial load effect
  useEffect(() => {
    loadGoogleMapsScript();
    
    return () => {
      // Clean up any pending retry timeouts
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [loadGoogleMapsScript]);

  return { isLoading, error, retryLoading };
};
