
import React from "react";
import { Card } from "@/components/ui/card";
import { formatDatesForDisplay } from "@/utils/availabilityUtils";

interface RoomTypesInfoProps {
  hotel: any;
}

export const RoomTypesInfo = ({ hotel }: RoomTypesInfoProps) => {
  const roomTypes = hotel.room_types || [];
  
  return (
    <Card className="p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Room Types</h3>
      
      {roomTypes && roomTypes.length > 0 ? (
        <div className="space-y-6">
          {roomTypes.map((room: any, index: number) => (
            <div key={room.id || index} className="border border-purple-700/50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-lg">{room.name}</h4>
                <div className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full">
                  {room.roomCount || 1} {room.roomCount === 1 ? 'Room' : 'Rooms'} Available
                </div>
              </div>
              
              {room.description && (
                <p className="text-gray-300 mb-3 text-sm">{room.description}</p>
              )}
              
              {/* Room Images */}
              {room.images && room.images.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-sm font-medium mb-2 text-fuchsia-200">Room Images:</h5>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                    {room.images.map((image: string, imgIndex: number) => (
                      <div key={imgIndex} className="aspect-square bg-purple-900/40 rounded overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${room.name} image ${imgIndex + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Room Rates */}
                {room.rates && Object.keys(room.rates).length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium mb-2 text-fuchsia-200">Rates:</h5>
                    <div className="bg-purple-900/30 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(room.rates).map(([duration, rate]: [string, any]) => (
                          <div key={duration} className="flex justify-between">
                            <span className="text-gray-300">{duration} days:</span>
                            <span className="font-medium">${rate}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Room Availability */}
                {room.availabilityDates && room.availabilityDates.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium mb-2 text-fuchsia-200">Availability:</h5>
                    <div className="bg-purple-900/30 rounded-lg p-3">
                      <div className="text-sm">
                        {formatDatesForDisplay(room.availabilityDates, hotel.available_months || []).join(', ')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-2 border-t border-purple-700/30 flex flex-wrap gap-3">
                <div className="text-sm">
                  <span className="text-gray-300">Max Occupancy:</span> {room.maxOccupancy || '1'} persons
                </div>
                {room.size && (
                  <div className="text-sm">
                    <span className="text-gray-300">Room Size:</span> {room.size} sq. ft.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 italic">No room types defined for this property.</p>
      )}
    </Card>
  );
};
