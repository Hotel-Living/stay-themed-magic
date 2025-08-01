import React, { useState, useEffect } from "react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";

interface HotelLocationProps {
  hotelId: string;
  latitude: number;
  longitude: number;
  hotelName: string;
  address: string;
  city: string;
  country: string;
}

export function HotelLocation({
  hotelId,
  latitude,
  longitude,
  hotelName,
  address,
  city,
  country
}: HotelLocationProps) {
  const [mapError, setMapError] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  // Build full address from hotel data
  const fullAddress = [address, city, country].filter(Boolean).join(', ');
  
  // Fetch API key from Supabase Edge Function
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch('/functions/v1/get-maps-key', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setApiKey(data.key || data.apiKey);
          console.log('🗺️ Successfully retrieved API key');
        } else {
          console.error('🗺️ Failed to fetch API key:', response.status);
          setMapError(true);
        }
      } catch (error) {
        console.error('🗺️ Error fetching API key:', error);
        setMapError(true);
      }
    };
    
    fetchApiKey();
  }, []);
  
  // Create Google Maps Embed URL with API key
  const createEmbedUrl = () => {
    if (!apiKey) return null;
    
    const baseUrl = 'https://www.google.com/maps/embed/v1/place';
    const hasCoordinates = latitude && longitude && !isNaN(latitude) && !isNaN(longitude);
    
    if (hasCoordinates) {
      return `${baseUrl}?key=${apiKey}&q=${latitude},${longitude}&zoom=15`;
    } else if (fullAddress.trim()) {
      return `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(fullAddress)}&zoom=15`;
    }
    
    return null;
  };
  
  // Create fallback Google Maps link
  const createFallbackUrl = () => {
    const hasCoordinates = latitude && longitude && !isNaN(latitude) && !isNaN(longitude);
    
    if (hasCoordinates) {
      return `https://www.google.com/maps?q=${latitude},${longitude}`;
    } else if (fullAddress.trim()) {
      return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`;
    }
    
    return null;
  };

  const embedUrl = createEmbedUrl();
  const fallbackUrl = createFallbackUrl();

  console.log(`🗺️ HotelLocation Debug for ${hotelName}:`, {
    hotelId,
    latitude,
    longitude,
    address,
    city,
    country,
    fullAddress,
    hasCoordinates: !!(latitude && longitude),
    hasApiKey: !!apiKey,
    embedUrl: embedUrl ? embedUrl.substring(0, 100) + '...' : null,
    fallbackUrl,
    mapError
  });

  // Don't render if we have no location data at all
  if (!fullAddress.trim() && (!latitude || !longitude)) {
    console.log('🗺️ No location data available, not rendering map');
    return null;
  }

  // Show fallback if map failed to load or no API key
  if (mapError || !apiKey || !embedUrl) {
    return (
      <div className="w-full h-[300px] flex flex-col items-center justify-center bg-muted rounded-lg border-2 border-dashed border-border">
        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Map temporarily unavailable
        </p>
        {fallbackUrl && (
          <Button variant="outline" asChild>
            <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Google Maps
            </a>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <iframe 
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        loading="lazy" 
        allowFullScreen 
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        title={`${hotelName} location`}
        className="rounded-lg"
        onError={(e) => {
          console.error('🗺️ Map iframe error:', e);
          setMapError(true);
        }}
        onLoad={() => console.log('🗺️ Map iframe loaded successfully')}
      />
      
      {/* Fallback link below the map */}
      {fallbackUrl && (
        <div className="mt-2 text-center">
          <Button variant="ghost" size="sm" asChild>
            <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-1" />
              Open in Google Maps
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}