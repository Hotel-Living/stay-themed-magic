
import React from "react";
import CoordinatesSection from "./StepOne/Location/sections/CoordinatesSection";

interface LocationCoordinatesSectionProps {
  latitude: string;
  longitude: string;
  setLatitude: (value: string) => void;
  setLongitude: (value: string) => void;
}

const LocationCoordinatesSection: React.FC<LocationCoordinatesSectionProps> = ({
  latitude,
  longitude,
  setLatitude,
  setLongitude
}) => (
  <CoordinatesSection
    latitude={latitude}
    longitude={longitude}
    setLatitude={setLatitude}
    setLongitude={setLongitude}
  />
);

export default LocationCoordinatesSection;
