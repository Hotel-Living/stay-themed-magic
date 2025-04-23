import React from "react";
import { MapPin } from "lucide-react";
import { AdminHotelDetail } from "@/types/hotel";

interface LocationInfoProps {
  hotel: AdminHotelDetail;
}

export function LocationInfo({ hotel }: LocationInfoProps) {
  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-purple-400" />
        Location
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Country</p>
          <p className="font-medium">{hotel.country}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">City</p>
          <p className="font-medium">{hotel.city}</p>
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
                {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
                  <iframe 
                    src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${hotel.latitude},${hotel.longitude}&zoom=15`}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Hotel location"
                  ></iframe>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <p className="text-gray-400">Google Maps API key not configured</p>
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
