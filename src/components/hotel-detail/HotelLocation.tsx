
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle } from "lucide-react";

interface HotelLocationProps {
  latitude: number;
  longitude: number;
  hotelName: string;
  address: string;
}

export function HotelLocation({ latitude, longitude, hotelName, address }: HotelLocationProps) {
  const [mapKey, setMapKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMapKey = async () => {
      try {
        setIsLoading(true);
        
        // Fetch from the edge function that securely provides the API key
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        
        if (error) {
          console.error('Error fetching map key:', error);
          // Try fallback from environment variable
          const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
          if (envKey) {
            setMapKey(envKey);
            return;
          }
          setError("Could not load map key");
          return;
        }
        
        if (data && data.key) {
          setMapKey(data.key);
        } else {
          // Try fallback from environment variable
          const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
          if (envKey) {
            setMapKey(envKey);
            return;
          }
          setError("No map key available");
        }
      } catch (err) {
        console.error('Exception fetching map key:', err);
        setError("Error loading map");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMapKey();
  }, []);

  // Generate a fallback URL if coordinates are not available
  const getMapUrl = () => {
    if (!mapKey) return null;
    
    if (latitude && longitude && !isNaN(latitude) && !isNaN(longitude)) {
      // Use direct Google Maps URL with the API key
      return `https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${latitude},${longitude}&zoom=15`;
    } else if (address) {
      // Use address-based map URL with the API key
      return `https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${encodeURIComponent(address)}&zoom=15`;
    }
    return null;
  };

  // Check if required props are available
  const hasMapData = (latitude && longitude && !isNaN(latitude) && !isNaN(longitude)) || address;
  const mapUrl = getMapUrl();
  
  if (!hasMapData) {
    return null;
  }

  return (
    <Card className="overflow-hidden bg-[#761B98] border-white/20">
      <CardHeader className="bg-white/10 pb-4">
        <CardTitle className="text-xl font-bold text-white">Location</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64 w-full">
          {isLoading && (
            <div className="w-full h-full bg-white/10 flex items-center justify-center">
              <p className="text-center text-white">Loading map...</p>
            </div>
          )}
          
          {!isLoading && error && (
            <div className="w-full h-full bg-white/10 flex flex-col items-center justify-center p-4">
              <AlertTriangle className="h-10 w-10 text-red-500 mb-3" />
              <p className="text-center text-white">
                {error}
                <br />
                Location: {address || `${latitude}, ${longitude}`}
              </p>
            </div>
          )}
          
          {!isLoading && !error && mapUrl && (
            <iframe 
              src={mapUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${hotelName} location`}
            ></iframe>
          )}
          
          {!isLoading && !error && !mapUrl && (
            <div className="w-full h-full bg-white/10 flex items-center justify-center">
              <p className="text-center text-white">
                Location information unavailable.
                <br />
                Location: {address || `${latitude}, ${longitude}`}
              </p>
            </div>
          )}
        </div>
        
        {address && (
          <div className="p-4 border-t border-white/20">
            <h3 className="text-sm font-medium mb-1 text-white">Address</h3>
            <p className="text-white">{address}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
