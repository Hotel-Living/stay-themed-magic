
import React from 'react';
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface LocationControlsProps {
  geocodeError: string | null;
}

export const LocationControls: React.FC<LocationControlsProps> = ({
  geocodeError
}) => {
  return (
    <>
      <Label className="block text-sm font-medium text-white mb-1">
        Location on Map (Click to select precise location)
      </Label>
      
      {geocodeError && (
        <Alert variant="destructive" className="mb-3 bg-red-900/20 border-red-800">
          <AlertTitle>Geocoding Error</AlertTitle>
          <AlertDescription>{geocodeError}</AlertDescription>
        </Alert>
      )}
    </>
  );
};
