
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Google Maps global types
interface Window {
  google: {
    maps: {
      Map: any;
      Marker: any;
      LatLng: any;
      Geocoder: any;
      GeocoderStatus: any;
      MapTypeId: any;
      MapTypeControlStyle: any;
      ControlPosition: any;
      event: any;
      Animation: any;
      StyledMapType: any;
      places: any;
    };
  };
}
