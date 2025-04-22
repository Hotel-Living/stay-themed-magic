
import { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { MapInstance } from '../types';

export const useMapSetup = (mapRef: React.RefObject<HTMLDivElement>) => {
  const [map, setMap] = useState<MapInstance | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google || !window.google.maps) return;

    try {
      const styledMapType = new window.google.maps.StyledMapType([
        { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#c9b2a6" }],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "geometry.stroke",
          stylers: [{ color: "#dcd2be" }],
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ae9e90" }],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#93817c" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{ color: "#a5b076" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#447530" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#f5f1e6" }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#fdfcf8" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#f8c967" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#e9bc62" }],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [{ color: "#e98d58" }],
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry.stroke",
          stylers: [{ color: "#db8555" }],
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [{ color: "#806b63" }],
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.fill",
          stylers: [{ color: "#8f7d77" }],
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ebe3cd" }],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [{ color: "#dfd2ae" }],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#b9d3c2" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#92998d" }],
        },
      ], { name: "Styled Map" });

      const mapOptions = {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 13,
        mapTypeId: "styled_map",
        mapTypeControl: true,
        mapTypeControlOptions: {
          mapTypeIds: ["styled_map", "roadmap", "satellite", "hybrid", "terrain"],
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_RIGHT,
        },
        fullscreenControl: false,
        streetViewControl: false,
      };

      console.log('Creating new Google Maps instance with light theme');
      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      
      // Fix: Use the correct method to set the map type ID
      // Instead of using setMapTypeId (which doesn't exist on the Map type)
      // Register the styled map type and set it through mapTypes.set
      newMap.mapTypes.set("styled_map", styledMapType);
      
      // Set the map type ID directly using the map's options
      if (newMap.setOptions) {
        newMap.setOptions({ mapTypeId: "styled_map" });
      }
      
      setMap(newMap);
    } catch (err) {
      console.error('Error initializing map:', err);
      toast({
        title: "Map Error",
        description: "Error initializing the map. Please try again.",
        variant: "destructive",
      });
    }
  }, [mapRef]);

  return { map };
};
