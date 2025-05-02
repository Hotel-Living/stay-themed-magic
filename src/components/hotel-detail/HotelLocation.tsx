
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
    <Card className="overflow-hidden">
      <CardHeader className="bg-[#AACAFE]/40 pb-4">
        <CardTitle className="text-xl font-bold text-[#3300B0]">Location</CardTitle>
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
            <div className="w-full h-full bg-[#AACAFE]/50 flex items-center justify-center">
              <p className="text-center text-[#3300B0]">
                Map display requires Google Maps API key.<br />
                Location: {address || `${latitude}, ${longitude}`}
              </p>
            </div>
          )}
        </div>
        
        {address && (
          <div className="p-4 border-t border-[#3300B0]/30">
            <h3 className="text-sm font-medium mb-1 text-[#3300B0]">Address</h3>
            <p className="text-[#3300B0]">{address}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
