
import React, { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";

// Add TypeScript type definitions for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

interface InteractiveMapProps {
  latitude: string;
  longitude: string;
  address: string;
  onLocationSelect: (lat: string, lng: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  latitude,
  longitude,
  address,
  onLocationSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the map
  useEffect(() => {
    // Load Google Maps API script
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    googleMapsScript.id = 'google-maps-script';
    
    googleMapsScript.onload = () => {
      initializeMap();
      setIsLoading(false);
    };
    
    googleMapsScript.onerror = () => {
      setError("Failed to load Google Maps. Please check your internet connection.");
      setIsLoading(false);
    };
    
    // Check if script already exists
    if (!document.getElementById('google-maps-script')) {
      document.head.appendChild(googleMapsScript);
    } else {
      initializeMap();
      setIsLoading(false);
    }
    
    return () => {
      // Clean up
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  // Function to initialize the map
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;
    
    // Default to a central position if no coordinates are provided
    const center = {
      lat: latitude ? parseFloat(latitude) : 40.7128,
      lng: longitude ? parseFloat(longitude) : -74.0060
    };
    
    const mapOptions: google.maps.MapOptions = {
      center,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [{ "color": "#242f3e" }]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#746855" }]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [{ "color": "#242f3e" }]
        }
      ]
    };
    
    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
    
    // Create a marker for the initial position if coordinates are provided
    if (latitude && longitude) {
      addMarker(newMap, { lat: parseFloat(latitude), lng: parseFloat(longitude) });
    }
    
    // Add click event listener to the map
    newMap.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat().toFixed(6);
        const lng = event.latLng.lng().toFixed(6);
        
        addMarker(newMap, event.latLng);
        onLocationSelect(lat, lng);
      }
    });
  };

  // Add or update marker
  const addMarker = (map: google.maps.Map, position: google.maps.LatLng | google.maps.LatLngLiteral) => {
    // Remove existing marker
    if (marker) {
      marker.setMap(null);
    }
    
    // Create new marker
    const newMarker = new window.google.maps.Marker({
      position,
      map,
      animation: window.google.maps.Animation.DROP,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#FF69B4",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF"
      }
    });
    
    setMarker(newMarker);
    
    // Center map on the new marker
    map.panTo(position);
  };

  // Update marker position when latitude/longitude props change
  useEffect(() => {
    if (map && latitude && longitude) {
      const position = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      };
      
      addMarker(map, position);
    }
  }, [latitude, longitude, map]);

  // Geocode address to get coordinates
  useEffect(() => {
    if (map && address && window.google && !latitude && !longitude) {
      const geocoder = new window.google.maps.Geocoder();
      
      geocoder.geocode({ address }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat().toFixed(6);
          const lng = location.lng().toFixed(6);
          
          addMarker(map, location);
          onLocationSelect(lat, lng);
        }
      });
    }
  }, [address, map, latitude, longitude, onLocationSelect]);

  return (
    <div className="mb-4">
      <Label className="block text-sm font-medium text-white mb-1">
        Location on Map (Click to select precise location)
      </Label>
      <div 
        ref={mapRef} 
        className="w-full h-[300px] rounded-lg border border-fuchsia-800/30 flex items-center justify-center bg-[#7A0486]"
      >
        {isLoading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-white">Loading map...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
      <p className="text-xs text-white/60 mt-1">
        Click anywhere on the map to set your property's exact location
      </p>
    </div>
  );
};

export default InteractiveMap;
