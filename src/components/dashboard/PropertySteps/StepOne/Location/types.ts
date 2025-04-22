
// Google Maps types
declare global {
  interface Window {
    google: typeof google;
  }
}

export interface GoogleMapOptions {
  center: { lat: number; lng: number };
  zoom: number;
  mapTypeId: string;
  mapTypeControl: boolean;
  fullscreenControl: boolean;
  streetViewControl: boolean;
  styles: Array<{
    featureType: string;
    elementType: string;
    stylers: Array<{ [key: string]: string | number }>;
  }>;
}

export interface MapProps {
  latitude: string;
  longitude: string;
  address: string;
  onLocationSelect: (lat: string, lng: string) => void;
}

export type MapInstance = google.maps.Map;

export interface MapSetupProps {
  mapRef: React.RefObject<HTMLDivElement>;
  latitude: string;
  longitude: string;
}

export interface MarkerProps {
  map: MapInstance | null;
  position: google.maps.LatLngLiteral;
  onLocationSelect: (lat: string, lng: string) => void;
}

