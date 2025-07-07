import React from "react";
interface HotelFeaturesInfoProps {
  hotelFeatures: string[];
  roomFeatures: string[];
}
export function HotelFeaturesInfo({
  hotelFeatures,
  roomFeatures
}: HotelFeaturesInfoProps) {
  // Process and ensure we have valid arrays
  const validHotelFeatures = Array.isArray(hotelFeatures) ? hotelFeatures.filter(Boolean) : [];
  const validRoomFeatures = Array.isArray(roomFeatures) ? roomFeatures.filter(Boolean) : [];

  // If both arrays are empty, return null
  if (validHotelFeatures.length === 0 && validRoomFeatures.length === 0) {
    return null;
  }
  return <div className="my-6 p-4 rounded-lg bg-[#957B23]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {validHotelFeatures.length > 0 && <div>
            <h3 className="text-xl font-semibold mb-4 text-white text-left">HOTEL FEATURES</h3>
            <div className="grid grid-cols-2 gap-2">
              {validHotelFeatures.map((feature, index) => <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-sm">{feature}</span>
                </div>)}
            </div>
          </div>}
        
        {validRoomFeatures.length > 0 && <div>
            <h3 className="text-xl font-semibold mb-4 text-white text-left">ROOM FEATURES</h3>
            <div className="grid grid-cols-2 gap-2">
              {validRoomFeatures.map((feature, index) => <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-sm">{feature}</span>
                </div>)}
            </div>
          </div>}
      </div>
    </div>;
}