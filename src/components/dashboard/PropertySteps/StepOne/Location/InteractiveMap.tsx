
import React from "react";

interface MapProps {
  latitude: string;
  longitude: string;
  onLocationChange?: (lat: any, lng: any) => void;
}

export default function InteractiveMap({ latitude, longitude, onLocationChange }: MapProps) {
  return (
    <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
      <p className="text-white">Interactive Map Component</p>
      <p className="text-sm text-gray-400 ml-2">
        Lat: {latitude || 'N/A'}, Lng: {longitude || 'N/A'}
      </p>
    </div>
  );
}
