
import React from "react";
import { useMapLogic } from "./hooks/useMapLogic";
import { MapCanvas } from "./components/MapCanvas";
import { LocationControls } from "./components/LocationControls";

interface MapProps {
  latitude: string;
  longitude: string;
  address?: string;
  onLocationChange?: (lat: any, lng: any) => void;
  onLocationSelect?: (lat: string, lng: string) => void;
}

export default function InteractiveMap({ 
  latitude, 
  longitude, 
  address = "",
  onLocationChange,
  onLocationSelect = () => {}
}: MapProps) {
  const {
    mapRef,
    isLoading,
    error,
    geocodeError,
    retryLoading
  } = useMapLogic({
    latitude,
    longitude,
    address,
    onLocationSelect
  });

  return (
    <div className="w-full">
      <LocationControls geocodeError={geocodeError} />
      <MapCanvas
        mapRef={mapRef}
        isLoading={isLoading}
        error={error}
        onRetry={retryLoading}
      />
    </div>
  );
}
