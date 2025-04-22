
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { MapInstance } from '../types';

interface UseGeocodingProps {
  map: MapInstance | null;
  address: string;
  updateMarker: (position: google.maps.LatLngLiteral) => void;
  onLocationSelect: (lat: string, lng: string) => void;
}

export const useGeocoding = ({ map, address, updateMarker, onLocationSelect }: UseGeocodingProps) => {
  const [previousAddress, setPreviousAddress] = useState<string>("");
  const [geocodeError, setGeocodeError] = useState<string | null>(null);

  useEffect(() => {
    if (!map || !window.google || !address) return;
    if (address === previousAddress || address.trim() === "") return;

    try {
      console.log(`Geocoding address: ${address}`);
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address }, (results: any, status: any) => {
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat().toFixed(6);
          const lng = location.lng().toFixed(6);
          console.log(`Geocoding successful: lat=${lat}, lng=${lng}`);

          updateMarker({ lat: parseFloat(lat), lng: parseFloat(lng) });

          const types = results[0].types || [];
          let newZoom = 13;

          if (types.includes('country')) newZoom = 5;
          else if (types.includes('administrative_area_level_1')) newZoom = 7;
          else if (types.includes('locality') || types.includes('administrative_area_level_2')) newZoom = 10;
          else if (types.includes('route')) newZoom = 15;
          else if (types.includes('street_address') || types.includes('premise')) newZoom = 17;

          map.setZoom(newZoom);
          onLocationSelect(lat, lng);
          setGeocodeError(null);

          toast({
            title: "Location Found",
            description: `Found coordinates for: ${address}`,
          });
        } else {
          console.error(`Geocoding failed: status=${status}`);
          setGeocodeError(`Could not find coordinates for: ${address}`);
          toast({
            title: "Geocoding Error",
            description: `Could not find coordinates for: ${address}`,
            variant: "destructive",
          });
        }
      });

      setPreviousAddress(address);
    } catch (err) {
      console.error('Error during geocoding:', err);
      setGeocodeError('Error looking up address. Please try again.');
    }
  }, [address, map, onLocationSelect, updateMarker, previousAddress]);

  return { geocodeError };
};
