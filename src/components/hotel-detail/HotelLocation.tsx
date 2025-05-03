
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HotelLocationProps {
  latitude: number;
  longitude: number;
  hotelName: string;
  address: string;
}

export function HotelLocation({ latitude, longitude, hotelName, address }: HotelLocationProps) {
  // Check if required props are available
  if (!latitude || !longitude) {
    return null;
  }

  return (
    <Card className="overflow-hidden bg-[#761B98] border-white/20">
      <CardHeader className="bg-white/10 pb-4">
        <CardTitle className="text-xl font-bold text-white">Location</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64 w-full">
          {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
            <iframe 
              src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}&zoom=15`} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title={`${hotelName} location`}
            ></iframe>
          ) : (
            <div className="w-full h-full bg-white/10 flex items-center justify-center">
              <p className="text-center text-white">
                Map display requires Google Maps API key.<br />
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
