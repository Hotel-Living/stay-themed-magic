
import { useEffect } from 'react';

interface MapMarkerProps {
  map: any;
  position: { lat: number; lng: number };
  onMarkerSet: () => void;
}

export const MapMarker = ({ map, position, onMarkerSet }: MapMarkerProps) => {
  useEffect(() => {
    if (!map || !position) return;

    const marker = new window.google.maps.Marker({
      position,
      map,
      animation: window.google.maps.Animation.DROP,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#FF69B4",
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: "#FFFFFF"
      }
    });

    map.panTo(position);
    onMarkerSet();

    return () => {
      marker.setMap(null);
    };
  }, [map, position, onMarkerSet]);

  return null;
};
