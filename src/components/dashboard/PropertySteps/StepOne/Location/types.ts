
// Google Maps types
declare global {
  interface Window {
    google: any;
  }
}

// Add type definitions for Google Maps
// This allows TypeScript to recognize the google namespace
declare namespace google.maps {
  class Map {
    constructor(element: HTMLElement, options: any);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    panTo(latLng: LatLng | LatLngLiteral): void;
    addListener(event: string, handler: Function): any;
    setOptions(options: any): void;
    getCenter(): LatLng;
    getZoom(): number;
    mapTypes: {
      set(id: string, mapType: any): void;
    };
  }

  class Marker {
    constructor(options: any);
    setPosition(latLng: LatLng | LatLngLiteral): void;
    getPosition(): LatLng;
    setMap(map: Map | null): void;
    addListener(event: string, handler: Function): any;
  }

  class Geocoder {
    constructor();
    geocode(request: any, callback: Function): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  enum GeocoderStatus {
    OK = "OK",
  }

  enum Animation {
    DROP = 1,
  }

  enum ControlPosition {
    TOP_RIGHT = 1,
  }

  enum MapTypeControlStyle {
    HORIZONTAL_BAR = 1,
  }

  class StyledMapType {
    constructor(styles: any[], options?: any);
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

// Updated MapInstance type to match Google Maps API
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
