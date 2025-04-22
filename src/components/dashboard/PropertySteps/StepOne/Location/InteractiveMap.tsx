
import React, { useRef } from "react";
import { MapProps } from "./types";
import { useGoogleMaps } from "./hooks/useGoogleMaps";
import { useMapSetup } from "./hooks/useMapSetup";
import { useMarkerManagement } from "./hooks/useMarkerManagement";
import { useGeocoding } from "./hooks/useGeocoding";
import { MapContainer } from "./components/MapContainer";

const InteractiveMap: React.FC<MapProps> = ({
  latitude,
  longitude,
  address,
  onLocationSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoading, error } = useGoogleMaps();
  const { map } = useMapSetup(mapRef);
  const { updateMarker } = useMarkerManagement({ map, onLocationSelect });
  const { geocodeError } = useGeocoding({ map, address, updateMarker, onLocationSelect });

  // Initialize coordinates if provided
  React.useEffect(() => {
    if (map && latitude && longitude) {
      const position = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      };
      updateMarker(position);
    }
  }, [map, latitude, longitude, updateMarker]);

  // Add click handler to map
  React.useEffect(() => {
    if (!map) return;

    const clickListener = map.addListener('click', (event: google.maps.MouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat().toFixed(6);
        const lng = event.latLng.lng().toFixed(6);
        console.log(`Map clicked: lat=${lat}, lng=${lng}`);
        
        updateMarker({
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        });
        
        onLocationSelect(lat, lng);
      }
    });

    return () => {
      google.maps.event.removeListener(clickListener);
    };
  }, [map, onLocationSelect, updateMarker]);

  return (
    <MapContainer 
      mapRef={mapRef}
      isLoading={isLoading}
      error={error}
      geocodeError={geocodeError}
    />
  );
};

export default InteractiveMap;
