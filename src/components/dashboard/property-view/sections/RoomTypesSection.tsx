
import React from "react";
import { formatDatesForDisplay } from "@/utils/availabilityUtils";

interface RoomTypesSectionProps {
  hotel: any;
}

export function RoomTypesSection({ hotel }: RoomTypesSectionProps) {
  const roomTypes = hotel.room_types || [];
  
  if (roomTypes.length === 0) {
    return (
      <div className="bg-fuchsia-950/30 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Room Types</h3>
        <p className="text-gray-300">No room types have been defined for this property.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-fuchsia-950/30 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4 border-b pb-2">Room Types ({roomTypes.length})</h3>
      
      <div className="space-y-6">
        {roomTypes.map((room: any, index: number) => (
          <div key={room.id || index} className="bg-fuchsia-900/20 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold">{room.name}</h4>
              <div className="bg-fuchsia-700 text-white text-xs px-3 py-1 rounded-full">
                {room.roomCount || 1} {room.roomCount === 1 ? 'Room' : 'Rooms'} Available
              </div>
            </div>
            
            {room.description && (
              <p className="text-gray-300 mb-3">{room.description}</p>
            )}
            
            {/* Room Images */}
            {room.images && room.images.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">Room Images:</h5>
                <div className="grid grid-cols-3 gap-2">
                  {room.images.map((image: string, imgIndex: number) => (
                    <div key={imgIndex} className="aspect-video bg-fuchsia-900/40 rounded overflow-hidden">
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
            
            {/* Room Rates */}
            {room.rates && Object.keys(room.rates).length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">Rates:</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(room.rates).map(([duration, rate]: [string, any]) => (
                    <div key={duration} className="bg-fuchsia-900/40 p-2 rounded text-center">
                      <div className="text-xs text-gray-300">{duration} days</div>
                      <div className="font-medium">${rate}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Room Availability */}
            {room.availabilityDates && room.availabilityDates.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">Availability:</h5>
                <div className="bg-fuchsia-900/40 p-3 rounded text-sm">
                  {formatDatesForDisplay(room.availabilityDates, hotel.available_months || []).join(', ')}
                </div>
              </div>
            )}
            
            <div className="mt-2 pt-2 border-t border-fuchsia-700/50">
              <div className="flex justify-between">
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
          </div>
        ))}
      </div>
    </div>
  );
}
