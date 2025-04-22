
import { useState, useEffect } from "react";

export const useGoogleMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if the Google Maps script is already loaded
    if (window.google && window.google.maps) {
      setIsLoading(false);
      return;
    }

    const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 
                             "AIzaSyBlY5mvGvzLBPGYpZrEdNKPT2yrJe9JQ4M";  // Fallback key for development

    // Create script element
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Handle script load events
    script.onload = () => {
      console.log("Google Maps script loaded successfully");
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error("Error loading Google Maps script");
      setError("Failed to load Google Maps. Please check your internet connection and try again.");
      setIsLoading(false);
    };

    // Add script to document
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Only remove the script if it was added by this component and hasn't loaded yet
      if (document.head.contains(script) && isLoading) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return { isLoading, error };
};
