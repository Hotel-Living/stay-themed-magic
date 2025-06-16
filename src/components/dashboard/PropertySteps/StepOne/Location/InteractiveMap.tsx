
import React from "react";
import { MapProps } from "./types";
import { useMapLogic } from "./hooks/useMapLogic";
import { MapCanvas } from "./components/MapCanvas";
import { LocationControls } from "./components/LocationControls";

const InteractiveMap: React.FC<MapProps> = ({
  latitude,
  longitude,
  address,
  onLocationSelect
}) => {
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
    <div className="mb-4">
      <LocationControls geocodeError={geocodeError} />
      
      <MapCanvas
        mapRef={mapRef}
        isLoading={isLoading}
        error={error}
        onRetry={retryLoading}
      />
      
      <p className="text-xs text-white/60 mt-1">
        Click anywhere on the map to set your property's exact location
      </p>
    </div>
  );
};

export default InteractiveMap;
