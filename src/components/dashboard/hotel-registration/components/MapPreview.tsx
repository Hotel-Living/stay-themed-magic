import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MapPreviewProps {
  address?: string;
  city?: string;
  country?: string;
  className?: string;
}

export const MapPreview = ({ address, city, country, className }: MapPreviewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Google Maps if not already loaded
  useEffect(() => {
    const loadGoogleMaps = async () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        
        if (error || !data?.key) {
          console.warn('Failed to load Google Maps API key');
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          setIsLoaded(true);
        };

        if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    loadGoogleMaps();
  }, []);

  // Initialize or update map when loaded and address changes
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !address) {
      console.log('Map not ready:', { isLoaded, hasMapRef: !!mapRef.current, address });
      return;
    }

    console.log('Initializing map for address:', `${address}, ${city}, ${country}`);
    
    const geocoder = new window.google.maps.Geocoder();
    const searchQuery = `${address}, ${city}, ${country}`.trim();

    geocoder.geocode({ address: searchQuery }, (results: any, status: any) => {
      console.log('Geocoding result:', { status, results });
      
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        console.log('Found location:', location.toString());
        
        // Initialize map if not exists
        if (!mapInstanceRef.current) {
          console.log('Creating new map instance');
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            zoom: 15,
            center: location,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
          });
        } else {
          console.log('Updating existing map center');
          mapInstanceRef.current.setCenter(location);
        }

        // Remove existing marker
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // Add new marker
        markerRef.current = new window.google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
          title: searchQuery,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#d946ef',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });
        
        console.log('Map and marker created successfully');
      } else {
        console.error('Geocoding failed:', status);
      }
    });
  }, [isLoaded, address, city, country]);

  if (!address) {
    return (
      <div className={`w-full h-32 bg-white/10 rounded border border-white/20 flex items-center justify-center ${className}`}>
        <span className="text-white/50 text-sm">Enter an address to see map preview</span>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`w-full h-32 bg-white/10 rounded border border-white/20 flex items-center justify-center ${className}`}>
        <span className="text-white/50 text-sm">Loading map...</span>
      </div>
    );
  }

  return (
    <div className={`w-full h-32 rounded border border-white/20 overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};