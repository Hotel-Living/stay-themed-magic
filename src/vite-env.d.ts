/// <reference types="vite/client" />

// Google Maps API type declarations
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      getCenter(): LatLng;
      setZoom(zoom: number): void;
      getZoom(): number;
      addListener(eventName: string, handler: Function): MapsEventListener;
      panTo(latLng: LatLng | LatLngLiteral): void;
      setTilt(tiltAngle: number): void;
      mapTypes: { set(id: string, mapType: MapType): void };
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setPosition(latLng: LatLng | LatLngLiteral): void;
      getPosition(): LatLng | null;
      setMap(map: Map | null): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
    }

    class Geocoder {
      geocode(
        request: GeocoderRequest,
        callback: (results: GeocoderResult[], status: GeocoderStatus) => void
      ): void;
    }

    class StyledMapType {
      constructor(styles: any[], options?: any);
    }

    interface MouseEvent {
      latLng?: LatLng;
      stop(): void;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      mapTypeControl?: boolean;
      mapTypeControlOptions?: any;
      fullscreenControl?: boolean;
      streetViewControl?: boolean;
      styles?: any[];
      tilt?: number;
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      animation?: Animation;
      draggable?: boolean;
      icon?: string | Icon | Symbol;
      title?: string;
    }

    interface LatLng {
      lat(): number;
      lng(): number;
      toJSON(): LatLngLiteral;
      toString(): string;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface Icon {
      url: string;
      size?: Size;
      scaledSize?: Size;
      origin?: Point;
      anchor?: Point;
    }

    interface Size {
      width: number;
      height: number;
    }

    interface Point {
      x: number;
      y: number;
    }

    interface GeocoderRequest {
      address?: string;
      location?: LatLng | LatLngLiteral;
      placeId?: string;
      bounds?: LatLngBounds;
      componentRestrictions?: GeocoderComponentRestrictions;
      region?: string;
    }

    interface GeocoderComponentRestrictions {
      country: string | string[];
    }

    interface GeocoderResult {
      address_components: GeocoderAddressComponent[];
      formatted_address: string;
      geometry: {
        location: LatLng;
        location_type: GeocoderLocationType;
        viewport: LatLngBounds;
        bounds?: LatLngBounds;
      };
      place_id: string;
      plus_code?: {
        compound_code: string;
        global_code: string;
      };
      types: string[];
      partial_match?: boolean;
      postcode_localities?: string[];
    }

    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }

    interface LatLngBounds {
      contains(latLng: LatLng | LatLngLiteral): boolean;
      equals(other: LatLngBounds | LatLngBoundsLiteral): boolean;
      extend(latLng: LatLng | LatLngLiteral): LatLngBounds;
      getCenter(): LatLng;
      getNorthEast(): LatLng;
      getSouthWest(): LatLng;
      intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean;
      isEmpty(): boolean;
      toJSON(): LatLngBoundsLiteral;
      toSpan(): LatLng;
      toString(): string;
      union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds;
    }

    interface LatLngBoundsLiteral {
      east: number;
      north: number;
      south: number;
      west: number;
    }

    interface MapsEventListener {
      remove(): void;
    }

    interface MapType {
      name?: string;
      alt?: string;
    }

    interface Symbol {
      path: SymbolPath | string;
      fillColor?: string;
      fillOpacity?: number;
      scale?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    }

    enum Animation {
      BOUNCE = 1,
      DROP = 2,
    }

    enum GeocoderLocationType {
      APPROXIMATE = 'APPROXIMATE',
      GEOMETRIC_CENTER = 'GEOMETRIC_CENTER',
      RANGE_INTERPOLATED = 'RANGE_INTERPOLATED',
      ROOFTOP = 'ROOFTOP',
    }

    enum GeocoderStatus {
      ERROR = 'ERROR',
      INVALID_REQUEST = 'INVALID_REQUEST',
      OK = 'OK',
      OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
      REQUEST_DENIED = 'REQUEST_DENIED',
      UNKNOWN_ERROR = 'UNKNOWN_ERROR',
      ZERO_RESULTS = 'ZERO_RESULTS',
    }

    enum SymbolPath {
      BACKWARD_CLOSED_ARROW = 3,
      BACKWARD_OPEN_ARROW = 4,
      CIRCLE = 0,
      FORWARD_CLOSED_ARROW = 1,
      FORWARD_OPEN_ARROW = 2,
    }

    const event: {
      addListener(
        instance: Object,
        eventName: string,
        handler: Function
      ): MapsEventListener;
      addDomListener(
        instance: Element,
        eventName: string,
        handler: Function,
        capture?: boolean
      ): MapsEventListener;
      clearInstanceListeners(instance: Object): void;
      clearListeners(instance: Object, eventName: string): void;
      removeListener(listener: MapsEventListener): void;
    };

    const ControlPosition: {
      BOTTOM_CENTER: number;
      BOTTOM_LEFT: number;
      BOTTOM_RIGHT: number;
      LEFT_BOTTOM: number;
      LEFT_CENTER: number;
      LEFT_TOP: number;
      RIGHT_BOTTOM: number;
      RIGHT_CENTER: number;
      RIGHT_TOP: number;
      TOP_CENTER: number;
      TOP_LEFT: number;
      TOP_RIGHT: number;
    };

    const MapTypeControlStyle: {
      DEFAULT: number;
      DROPDOWN_MENU: number;
      HORIZONTAL_BAR: number;
      INSET: number;
      INSET_LARGE: number;
    };

    interface NavigationControlOptions {
      position?: number;
    }
  }
}
