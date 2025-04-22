
// Google Maps types
declare global {
  interface Window {
    google: any;
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
