
import React from "react";
import { Label } from "@/components/ui/label";
import InteractiveMap from "../InteractiveMap";

interface MapSectionProps {
  latitude: string;
  longitude: string;
  formattedAddress: string;
  onLocationSelect: (lat: string, lng: string) => void;
}

export default function MapSection({
  latitude,
  longitude,
  formattedAddress,
  onLocationSelect
}: MapSectionProps) {
  return (
    <div>
      <Label className="block text-sm font-medium text-white mb-1 uppercase">
        LOCATION ON MAP
      </Label>
      <InteractiveMap
        latitude={latitude}
        longitude={longitude}
        address={formattedAddress}
        onLocationSelect={onLocationSelect}
      />
    </div>
  );
}
