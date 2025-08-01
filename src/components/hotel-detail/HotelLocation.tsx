import React from "react";

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
  
  // Debug logging
  console.log(`🗺️ HotelLocation Debug for ${hotelName}:`, {
    hotelId,
    latitude,
    longitude,
    address,
    city,
    country,
    hasCoordinates: !!(latitude && longitude)
  });

  // Build full address from hotel data
  const fullAddress = [address, city, country].filter(Boolean).join(', ');
  
  // Hardcoded API key for immediate map rendering
  const apiKey = 'AIzaSyBGCKW0b90070alJcyrv-8nSb8kr56c2jM';
  
  // Simple direct approach: use coordinates if available, otherwise use address
  const mapSrc = latitude && longitude && !isNaN(latitude) && !isNaN(longitude)
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`
    : `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(fullAddress)}`;

  console.log(`🗺️ Map URL generated:`, mapSrc.replace(apiKey, 'API_KEY_HIDDEN'));

  // Don't render if we have no location data at all
  if (!fullAddress.trim() && (!latitude || !longitude)) {
    console.log('🗺️ No location data available, not rendering map');
    return null;
  }

  return (
    <div className="w-full h-full">
      <iframe 
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        loading="lazy" 
        allowFullScreen 
        src={mapSrc}
        title={`${hotelName} location`}
        className="rounded-lg"
        onError={(e) => console.error('🗺️ Map iframe error:', e)}
        onLoad={() => console.log('🗺️ Map iframe loaded successfully')}
      />
    </div>
  );
}