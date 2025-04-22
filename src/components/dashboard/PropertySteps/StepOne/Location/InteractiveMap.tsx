
import React, { useRef, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { MapProps } from "./types";
import { useGoogleMaps } from "./hooks/useGoogleMaps";
import { MapMarker } from "./components/MapMarker";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

const InteractiveMap: React.FC<MapProps> = ({
  latitude,
  longitude,
  address,
  onLocationSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const { isLoading, error } = useGoogleMaps();
  const [geocodeError, setGeocodeError] = useState<string | null>(null);
  const [previousAddress, setPreviousAddress] = useState<string>("");
  const [marker, setMarker] = useState<any>(null);
  
  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !window.google || isLoading) return;
    
    try {
      const center = {
        lat: latitude ? parseFloat(latitude) : 40.7128,
        lng: longitude ? parseFloat(longitude) : -74.0060
      };

      // Create the styled map type
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
        center,
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
      
      // Associate the styled map with the MapTypeId
      newMap.mapTypes.set("styled_map", styledMapType);
      setMap(newMap);
      
      // Add click event listener
      newMap.addListener('click', (event: any) => {
        if (event.latLng) {
          const lat = event.latLng.lat().toFixed(6);
          const lng = event.latLng.lng().toFixed(6);
          console.log(`Map clicked: lat=${lat}, lng=${lng}`);
          
          // Update marker position
          updateMarker(newMap, {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          });
          
          onLocationSelect(lat, lng);
          toast({
            title: "Location Selected",
            description: `Coordinates set to: ${lat}, ${lng}`,
          });
        }
      });
      
      // Initialize the marker if coordinates are provided
      if (latitude && longitude) {
        const position = {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude)
        };
        updateMarker(newMap, position);
      }
      
      console.log('Map initialized successfully with light theme');
    } catch (err) {
      console.error('Error initializing map:', err);
      setGeocodeError('Error initializing the map. Please try again.');
    }
  }, [isLoading]);

  // Helper function to update or create marker
  const updateMarker = (mapInstance: any, position: { lat: number, lng: number }) => {
    if (marker) {
      marker.setPosition(position);
    } else {
      const newMarker = new window.google.maps.Marker({
        position,
        map: mapInstance,
        animation: window.google.maps.Animation.DROP,
        draggable: true,
      });
      
      // Add drag event to marker
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
    
    // Center map on the marker
    mapInstance.panTo(position);
  };

  // Handle geocoding whenever address changes
  useEffect(() => {
    if (!map || !window.google || !address) return;
    
    // Skip if address hasn't changed
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
          
          // Update marker and map
          updateMarker(map, {
            lat: parseFloat(lat),
            lng: parseFloat(lng)
          });
          
          // Update zoom based on result precision
          const types = results[0].types || [];
          let newZoom = 13; // Default zoom
          
          if (types.includes('country')) {
            newZoom = 5;
          } else if (types.includes('administrative_area_level_1')) {
            newZoom = 7;
          } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
            newZoom = 10;
          } else if (types.includes('route')) {
            newZoom = 15;
          } else if (types.includes('street_address') || types.includes('premise')) {
            newZoom = 17;
          }
          
          map.setZoom(newZoom);
          
          // Update coordinates
          onLocationSelect(lat, lng);
          
          // Clear any previous errors
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
  }, [address, map]);

  return (
    <div className="mb-4">
      <Label className="block text-sm font-medium text-white mb-1">
        Location on Map (Click to select precise location)
      </Label>
      
      {geocodeError && (
        <Alert variant="destructive" className="mb-3 bg-red-900/20 border-red-800">
          <AlertTitle>Geocoding Error</AlertTitle>
          <AlertDescription>{geocodeError}</AlertDescription>
        </Alert>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-[300px] rounded-lg border border-fuchsia-800/30 flex items-center justify-center bg-[#7A0486]"
      >
        {isLoading && <LoadingState />}
        {error && <ErrorState error={error} />}
      </div>
      <p className="text-xs text-white/60 mt-1">
        Click anywhere on the map to set your property's exact location
      </p>
    </div>
  );
};

export default InteractiveMap;
