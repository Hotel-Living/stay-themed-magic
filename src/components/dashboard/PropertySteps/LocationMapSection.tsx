
import React from "react";
import MapSection from "./StepOne/Location/sections/MapSection";

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
  <MapSection
    latitude={latitude}
    longitude={longitude}
    formattedAddress={formattedAddress}
    onLocationSelect={onLocationSelect}
  />
);

export default LocationMapSection;
