import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation('hotels');
  const [mapKey, setMapKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [coordinates, setCoordinates] = useState<{lat: number; lng: number} | null>(
    latitude && longitude && !isNaN(latitude) && !isNaN(longitude) 
      ? { lat: latitude, lng: longitude } 
      : null
  );
  // Geocode address to coordinates if needed
  const geocodeAddress = async (apiKey: string) => {
    if (coordinates) return; // Already have coordinates
    
    const fullAddress = [address, city, country].filter(Boolean).join(', ');
    if (!fullAddress.trim()) return; // No address to geocode

    try {
      console.log('Geocoding address:', fullAddress);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK' || !data.results || data.results.length === 0) {
        console.warn('Geocoding failed:', data.status, data.error_message);
        return;
      }
      
      const location = data.results[0].geometry.location;
      const newCoordinates = { lat: location.lat, lng: location.lng };
      
      console.log('Geocoded coordinates:', newCoordinates);
      setCoordinates(newCoordinates);
      
      // Update hotel record with coordinates to avoid future geocoding
      try {
        const { error: updateError } = await supabase
          .from('hotels')
          .update({
            latitude: location.lat,
            longitude: location.lng
          })
          .eq('id', hotelId);
          
        if (updateError) {
          console.warn('Failed to update hotel coordinates:', updateError);
        } else {
          console.log('Hotel coordinates updated successfully');
        }
      } catch (updateErr) {
        console.warn('Error updating hotel coordinates:', updateErr);
      }
    } catch (err) {
      console.error('Geocoding error:', err);
    }
  };

  const fetchMapKey = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch from the edge function that securely provides the API key
      const {
        data,
        error
      } = await supabase.functions.invoke('get-maps-key');
      
      let apiKey: string | null = null;
      
      if (error || !data || (!data.key && !data.apiKey)) {
        console.error('Error fetching map key:', error);
        // Try fallback from environment variable
        const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        if (envKey) {
          console.log('Using fallback API key from environment');
          apiKey = envKey;
        } else {
          setError("Could not load map key");
          setIsLoading(false);
          return;
        }
      } else {
        console.log('Successfully retrieved API key');
        apiKey = data.key || data.apiKey;
      }
      
      if (apiKey) {
        setMapKey(apiKey);
        setMapReady(true);
        
        // Geocode address if coordinates are missing
        await geocodeAddress(apiKey);
      } else {
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

  // Generate map URL based on available data
  const getMapUrl = () => {
    if (!mapKey) return null;
    
    if (coordinates) {
      // Use geocoded or existing coordinates
      return `https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${coordinates.lat},${coordinates.lng}&zoom=15`;
    } else {
      // Fallback to address-based map
      const fullAddress = [address, city, country].filter(Boolean).join(', ');
      if (fullAddress.trim()) {
        return `https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${encodeURIComponent(fullAddress)}&zoom=15`;
      }
    }
    return null;
  };

  // Check if we have any location data to display
  const fullAddress = [address, city, country].filter(Boolean).join(', ');
  const hasMapData = coordinates || fullAddress.trim();
  const mapUrl = mapReady ? getMapUrl() : null;
  if (!hasMapData) {
    return null;
  }
  return <Card className="overflow-hidden border-border">
      <CardHeader className="bg-white/10 pb-4">
        <CardTitle className="text-xl font-bold text-white">{t('hotels.hotelLocation')}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64 w-full">
          {isLoading && <div className="w-full h-full bg-white/10 flex items-center justify-center">
              <p className="text-center text-white">{t('hotels.loadingMap')}</p>
            </div>}
          
          {!isLoading && error && <div className="w-full h-full bg-white/10 flex flex-col items-center justify-center p-4">
              <AlertTriangle className="h-10 w-10 text-red-500 mb-3" />
              <p className="text-center text-white mb-3">
                {error}
              </p>
              <p className="text-sm text-white/70 mb-3">
                {t('hotels.location')}: {fullAddress || (coordinates ? `${coordinates.lat}, ${coordinates.lng}` : t('hotels.noLocationData'))}
              </p>
              <Button variant="outline" size="sm" className="bg-purple-700/40 hover:bg-purple-700/60 border-purple-500" onClick={fetchMapKey}>
                {t('hotels.retryLoadingMap')}
              </Button>
            </div>}
          
          {!isLoading && !error && mapReady && mapUrl && <iframe src={mapUrl} width="100%" height="100%" style={{
          border: 0
        }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${hotelName} location`}></iframe>}
          
          {!isLoading && !error && (!mapReady || !mapUrl) && <div className="w-full h-full bg-white/10 flex items-center justify-center">
              <p className="text-center text-white">
                {t('hotels.locationInfoUnavailable')}.
                <br />
                {t('hotels.location')}: {fullAddress || (coordinates ? `${coordinates.lat}, ${coordinates.lng}` : t('hotels.noLocationData'))}
              </p>
            </div>}
        </div>
      </CardContent>
    </Card>;
}