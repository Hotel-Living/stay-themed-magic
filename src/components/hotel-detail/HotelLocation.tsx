
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [mapReady, setMapReady] = useState(false);
  
  const fetchMapKey = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch from the edge function that securely provides the API key
      const { data, error } = await supabase.functions.invoke('get-maps-key');
      
      if (error) {
        console.error('Error fetching map key:', error);
        // Try fallback from environment variable
        const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (envKey) {
          console.log('Using fallback API key from environment');
          setMapKey(envKey);
          setIsLoading(false);
          setMapReady(true);
          return;
        }
        setError("Could not load map key");
        setIsLoading(false);
        return;
      }
      
      if (data && (data.key || data.apiKey)) {
        console.log('Successfully retrieved API key');
        setMapKey(data.key || data.apiKey);
        setMapReady(true);
      } else {
        console.error('No map key in response:', data);
        // Try fallback from environment variable
        const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (envKey) {
          console.log('Using fallback API key from environment');
          setMapKey(envKey);
          setMapReady(true);
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
  
  useEffect(() => {
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
  const mapUrl = mapReady ? getMapUrl() : null;
  
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
              <p className="text-center text-white mb-3">
                {error}
              </p>
              <p className="text-sm text-white/70 mb-3">
                Location: {address || `${latitude}, ${longitude}`}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-purple-700/40 hover:bg-purple-700/60 border-purple-500"
                onClick={fetchMapKey}
              >
                Retry Loading Map
              </Button>
            </div>
          )}
          
          {!isLoading && !error && mapReady && mapUrl && (
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
          
          {!isLoading && !error && (!mapReady || !mapUrl) && (
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
