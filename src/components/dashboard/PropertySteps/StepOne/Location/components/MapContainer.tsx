
import React from 'react';
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

interface MapContainerProps {
  mapRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  error: string | null;
  geocodeError: string | null;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  mapRef,
  isLoading,
  error,
  geocodeError
}) => {
  return (
    <div className="mb-4">
      <Label className="block text-sm font-medium text-white mb-1">
        Location on Map (Click to select precise location)
      </Label>

      {geocodeError && (
        <Alert variant="destructive" className="mb-3 bg-red-900/20 border-red-800">
          <AlertTitle>Geocoding Error</AlertTitle>
          <AlertDescription>{geocodeError}</AlertDescription>
        </Alert>
      )}

      <div 
        ref={mapRef} 
        className="w-full h-[300px] rounded-lg border border-fuchsia-800/30 flex items-center justify-center bg-[#7A0486]"
      >
        {isLoading && <LoadingState />}
        {error && <ErrorState error={error} />}
      </div>
      <p className="text-xs text-white/60 mt-1">
        Click anywhere on the map to set your property's exact location
      </p>
    </div>
  );
};
