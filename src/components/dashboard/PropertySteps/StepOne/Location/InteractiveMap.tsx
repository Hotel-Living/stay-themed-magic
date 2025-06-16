
import React from "react";

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
  address,
  onLocationChange,
  onLocationSelect 
}: MapProps) {
  return (
    <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
      <p className="text-white">Interactive Map Component</p>
      <p className="text-sm text-gray-400 ml-2">
        Lat: {latitude || 'N/A'}, Lng: {longitude || 'N/A'}
      </p>
      {address && (
        <p className="text-sm text-gray-400 ml-2">
          Address: {address}
        </p>
      )}
    </div>
  );
}
