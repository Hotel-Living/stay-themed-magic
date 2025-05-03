
import React, { useState, useEffect } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import { AdminHotelDetail } from "@/types/hotel";
import { supabase } from "@/integrations/supabase/client";

interface LocationInfoProps {
  hotel: AdminHotelDetail;
}

export function LocationInfo({ hotel }: LocationInfoProps) {
  const [mapKey, setMapKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMapKey = async () => {
      try {
        setIsLoading(true);
        
        // Try to get key from edge function
        const { data, error } = await supabase.functions.invoke('get-maps-key');
        
        if (error) {
          console.error('Error fetching map key:', error);
          // Try fallback
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
          // Try fallback
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

  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-purple-400" />
        Location
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Country</p>
          <p className="font-medium">{hotel.country || "Not specified"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">City</p>
          <p className="font-medium">{hotel.city || "Not specified"}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-gray-400">Address</p>
          <p className="font-medium">{hotel.address || "No address provided."}</p>
        </div>
        {hotel.latitude && hotel.longitude && (
          <>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-400">Coordinates</p>
              <p className="font-medium">Lat: {hotel.latitude}, Long: {hotel.longitude}</p>
            </div>
            <div className="md:col-span-2">
              <div className="mt-4 h-64 rounded-lg overflow-hidden">
                {isLoading && (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <p className="text-gray-400">Loading map...</p>
                  </div>
                )}
                
                {!isLoading && error && (
                  <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center p-4">
                    <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
                    <p className="text-gray-400">{error}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Coordinates: {hotel.latitude}, {hotel.longitude}
                    </p>
                  </div>
                )}
                
                {!isLoading && !error && mapKey && (
                  <iframe 
                    src={`https://www.google.com/maps/embed/v1/view?key=${mapKey}&center=${hotel.latitude},${hotel.longitude}&zoom=15`}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Hotel location"
                  ></iframe>
                )}
                
                {!isLoading && !error && !mapKey && (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <p className="text-gray-400">Google Maps API key not available</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
