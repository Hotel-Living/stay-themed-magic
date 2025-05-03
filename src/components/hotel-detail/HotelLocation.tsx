
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HotelLocationProps {
  latitude: number;
  longitude: number;
  hotelName: string;
  address: string;
}

export function HotelLocation({ latitude, longitude, hotelName, address }: HotelLocationProps) {
  // Generate a fallback URL if coordinates are not available
  const getMapUrl = () => {
    if (latitude && longitude && !isNaN(latitude) && !isNaN(longitude)) {
      // Use direct Google Maps URL instead of the API to avoid key issues
      return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1620820000000!5m2!1sen!2sus`;
    } else if (address) {
      // Use address-based map URL
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyAOutSTEY06T-0vlDYJsfOzunrBOyDv4uY&q=${encodeURIComponent(address)}&zoom=15`;
    }
    return '';
  };

  // Check if required props are available
  const hasMapData = (latitude && longitude && !isNaN(latitude) && !isNaN(longitude)) || address;
  
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
          {hasMapData ? (
            <iframe 
              src={getMapUrl()}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${hotelName} location`}
            ></iframe>
          ) : (
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
