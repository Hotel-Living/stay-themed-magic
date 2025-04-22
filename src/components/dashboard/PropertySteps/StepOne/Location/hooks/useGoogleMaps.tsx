
import { useState, useEffect } from "react";

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if the Google Maps script is already loaded
    if (window.google && window.google.maps) {
      console.log('Google Maps already loaded, skipping script creation');
      setIsLoading(false);
      setIsLoaded(true);
      return;
    }

    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!googleMapsApiKey) {
      console.error('No Google Maps API key found in environment variables');
      setError("Google Maps API key is missing. Please check your environment configuration.");
      setIsLoading(false);
      return;
    }

    // Look for existing script
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingScript) {
      console.log('Found existing Google Maps script, removing it first');
      existingScript.remove();
    }

    // Create script element
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Handle script load events
    script.onload = () => {
      console.log("Google Maps script loaded successfully");
      setIsLoading(false);
      setIsLoaded(true);
    };

    script.onerror = (e) => {
      console.error("Error loading Google Maps script:", e);
      setError("Failed to load Google Maps. Please check your internet connection and try again.");
      setIsLoading(false);
    };

    // Add script to document
    document.head.appendChild(script);
    console.log('Google Maps script added to document head');

    // Cleanup function
    return () => {
      // We don't remove the script on unmount as it might be needed by other components
    };
  }, []);

  return { isLoading, error, isLoaded };
};
