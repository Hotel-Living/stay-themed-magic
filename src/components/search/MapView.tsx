
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { HotelDetailProps } from '@/types/hotel';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';

// Replace with your Mapbox token
// For production, store this in environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNscXlvdjF3dTF5enEya25zaGZ6ajJ4ZTYifQ.KCnaOJ_93WQJ1nBwkbWBGw';

interface MapViewProps {
  hotels: HotelDetailProps[];
  isLoading: boolean;
  onHotelSelect?: (hotelId: string) => void;
}

export function MapView({ hotels, isLoading, onHotelSelect }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    // Initialize Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 20], // Default center
      zoom: 1.5,
    });
    
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    newMap.on('load', () => {
      setMapLoaded(true);
    });
    
    map.current = newMap;
    
    return () => {
      newMap.remove();
      map.current = null;
    };
  }, []);
  
  // Update markers when hotels or map changes
  useEffect(() => {
    if (!map.current || !mapLoaded || isLoading) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    if (hotels.length === 0) return;
    
    // Add markers for each hotel
    const bounds = new mapboxgl.LngLatBounds();
    
    hotels.forEach(hotel => {
      // Skip hotels without lat/lng (in a real app, you would geocode addresses)
      // For demo, generate random coordinates near the actual country
      const randomLng = Math.random() * 20 - 10;
      const randomLat = Math.random() * 10 - 5;
      
      // Create a custom marker element
      const el = document.createElement('div');
      el.className = 'hotel-marker';
      el.innerHTML = `<div class="w-6 h-6 bg-fuchsia-600 rounded-full flex items-center justify-center shadow-lg hover:bg-fuchsia-500 transition-colors">
        <span class="text-white" style="transform: translateY(-1px)">$</span>
      </div>`;
      
      // Create tooltip content
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2 max-w-xs">
          <h3 class="font-semibold">${hotel.name}</h3>
          <p class="text-sm">${hotel.city}, ${hotel.country}</p>
          <p class="text-sm font-medium mt-1">$${hotel.price_per_month}/month</p>
        </div>
      `);
      
      // Create and add the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([hotel.longitude || randomLng, hotel.latitude || randomLat])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Add click handler for marker
      el.addEventListener('click', () => {
        if (onHotelSelect) {
          onHotelSelect(hotel.id);
        }
      });
      
      markersRef.current.push(marker);
      
      // Extend map bounds to include this point
      bounds.extend([hotel.longitude || randomLng, hotel.latitude || randomLat]);
    });
    
    // Fit map to bounds with padding
    if (!bounds.isEmpty()) {
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [hotels, mapLoaded, isLoading, onHotelSelect]);

  if (isLoading) {
    return (
      <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
        <Skeleton className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-muted animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-white/10">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {hotels.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
          <MapPin className="w-12 h-12 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No hotels found to display on map</p>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .mapboxgl-popup-content {
          background-color: rgba(20, 20, 35, 0.95);
          color: white;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        }
        
        .mapboxgl-popup-tip {
          border-top-color: rgba(20, 20, 35, 0.95) !important;
          border-bottom-color: rgba(20, 20, 35, 0.95) !important;
        }
        
        .mapboxgl-popup-close-button {
          color: white;
        }
      `}} />
    </div>
  );
}
