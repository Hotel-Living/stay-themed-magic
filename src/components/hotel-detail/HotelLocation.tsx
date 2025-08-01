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
  
  // Build full address from hotel data
  const fullAddress = [address, city, country].filter(Boolean).join(', ');
  
  // Create Google Maps URL - use coordinates if available, otherwise use address
  const mapsUrl = latitude && longitude && !isNaN(latitude) && !isNaN(longitude)
    ? `https://www.google.com/maps?q=${latitude},${longitude}&t=m&z=15&output=embed&iwloc=near`
    : `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=m&z=15&output=embed&iwloc=near`;

  console.log(`🗺️ HotelLocation Debug for ${hotelName}:`, {
    hotelId,
    latitude,
    longitude,
    address,
    city,
    country,
    hasCoordinates: !!(latitude && longitude),
    mapsUrl: mapsUrl.substring(0, 100) + '...'
  });

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
        referrerPolicy="no-referrer-when-downgrade"
        src={mapsUrl}
        title={`${hotelName} location`}
        className="rounded-lg"
        onError={(e) => console.error('🗺️ Map iframe error:', e)}
        onLoad={() => console.log('🗺️ Map iframe loaded successfully')}
      />
    </div>
  );
}