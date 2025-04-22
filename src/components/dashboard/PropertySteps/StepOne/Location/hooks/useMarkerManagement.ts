
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { MapInstance } from '../types';

interface UseMarkerManagementProps {
  map: MapInstance | null;
  onLocationSelect: (lat: string, lng: string) => void;
}

export const useMarkerManagement = ({ map, onLocationSelect }: UseMarkerManagementProps) => {
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  // Clean up marker when component unmounts or map changes
  useEffect(() => {
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, map]);

  const updateMarker = (position: google.maps.LatLngLiteral) => {
    if (!map) return;

    if (marker) {
      marker.setPosition(position);
    } else {
      try {
        const newMarker = new window.google.maps.Marker({
          position,
          map,
          animation: window.google.maps.Animation.DROP,
          draggable: true,
        });

        const dragEndListener = newMarker.addListener('dragend', () => {
          const markerPosition = newMarker.getPosition();
          if (markerPosition) {
            const lat = markerPosition.lat().toFixed(6);
            const lng = markerPosition.lng().toFixed(6);
            onLocationSelect(lat, lng);
            
            toast({
              title: "Location Updated",
              description: `New coordinates: ${lat}, ${lng}`,
            });
          }
        });

        setMarker(newMarker);
      } catch (error) {
        console.error('Error creating marker:', error);
      }
    }

    map.panTo(position);
  };

  return { marker, updateMarker };
};
