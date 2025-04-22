import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { MapInstance } from '../types';

interface UseMarkerManagementProps {
  map: MapInstance | null;
  onLocationSelect: (lat: string, lng: string) => void;
}

export const useMarkerManagement = ({ map, onLocationSelect }: UseMarkerManagementProps) => {
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  const updateMarker = (position: google.maps.LatLngLiteral) => {
    if (!map) return;

    if (marker) {
      marker.setPosition(position);
    } else {
      const newMarker = new window.google.maps.Marker({
        position,
        map,
        animation: window.google.maps.Animation.DROP,
        draggable: true,
      });

      newMarker.addListener('dragend', () => {
        const position = newMarker.getPosition();
        if (position) {
          const lat = position.lat().toFixed(6);
          const lng = position.lng().toFixed(6);
          onLocationSelect(lat, lng);
          
          toast({
            title: "Location Updated",
            description: `New coordinates: ${lat}, ${lng}`,
          });
        }
      });

      setMarker(newMarker);
    }

    map.panTo(position);
  };

  return { marker, updateMarker };
};
