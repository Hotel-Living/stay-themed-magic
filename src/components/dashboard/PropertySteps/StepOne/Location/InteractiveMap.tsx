
import React, { useRef, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { MapProps } from "./types";
import { useGoogleMaps } from "./hooks/useGoogleMaps";
import { MapMarker } from "./components/MapMarker";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";

const InteractiveMap: React.FC<MapProps> = ({
  latitude,
  longitude,
  address,
  onLocationSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const { isLoading, error } = useGoogleMaps();

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !window.google || isLoading) return;
    
    const center = {
      lat: latitude ? parseFloat(latitude) : 40.7128,
      lng: longitude ? parseFloat(longitude) : -74.0060
    };
    
    const mapOptions = {
      center,
      zoom: 13,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
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
    
    // Add click event listener
    newMap.addListener('click', (event: any) => {
      if (event.latLng) {
        const lat = event.latLng.lat().toFixed(6);
        const lng = event.latLng.lng().toFixed(6);
        onLocationSelect(lat, lng);
      }
    });
  }, [latitude, longitude, isLoading]);

  // Handle geocoding
  useEffect(() => {
    if (map && address && window.google && !latitude && !longitude) {
      const geocoder = new window.google.maps.Geocoder();
      
      geocoder.geocode({ address }, (results: any, status: any) => {
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat().toFixed(6);
          const lng = location.lng().toFixed(6);
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
        {isLoading && <LoadingState />}
        {error && <ErrorState error={error} />}
        {map && latitude && longitude && (
          <MapMarker 
            map={map}
            position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
            onMarkerSet={() => {}}
          />
        )}
      </div>
      <p className="text-xs text-white/60 mt-1">
        Click anywhere on the map to set your property's exact location
      </p>
    </div>
  );
};

export default InteractiveMap;
