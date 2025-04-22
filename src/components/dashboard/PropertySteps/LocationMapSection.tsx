
import React from "react";
import InteractiveMap from "./StepOne/Location/InteractiveMap";

interface LocationMapSectionProps {
  latitude: string;
  longitude: string;
  formattedAddress: string;
  onLocationSelect: (lat: string, lng: string) => void;
}

const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  latitude,
  longitude,
  formattedAddress,
  onLocationSelect
}) => (
  <div className="mt-4 mb-6">
    <InteractiveMap
      latitude={latitude}
      longitude={longitude}
      address={formattedAddress}
      onLocationSelect={onLocationSelect}
    />
  </div>
);

export default LocationMapSection;
