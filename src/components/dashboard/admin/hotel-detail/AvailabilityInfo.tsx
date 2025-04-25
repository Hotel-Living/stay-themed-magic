
import React from "react";
import { Card } from "@/components/ui/card";

export const AvailabilityInfo = ({ hotel }) => {
  // Format stay lengths for display
  const formatStayLength = (days) => {
    return days === 1 ? `${days} day` : `${days} days`;
  };
  
  // Make sure available months are properly displayed with capitalized first letter
  const formatMonthName = (month) => {
    if (!month) return '';
    return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
  };

  return (
    <Card className="p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Availability Information</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h4 className="font-medium text-fuchsia-200">Available Months</h4>
          {hotel.available_months && hotel.available_months.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {hotel.available_months.map(month => (
                <span 
                  key={month} 
                  className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm"
                >
                  {formatMonthName(month)}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No available months specified</p>
          )}
        </div>
        
        <div>
          <h4 className="font-medium text-fuchsia-200">Stay Lengths</h4>
          {hotel.stay_lengths && hotel.stay_lengths.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {hotel.stay_lengths.map(length => (
                <span 
                  key={length} 
                  className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm"
                >
                  {formatStayLength(length)}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No stay lengths specified</p>
          )}
        </div>
        
        <div>
          <h4 className="font-medium text-fuchsia-200">Meal Plans</h4>
          {hotel.meal_plans && hotel.meal_plans.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {hotel.meal_plans.map(plan => (
                <span 
                  key={plan} 
                  className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm"
                >
                  {plan}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No meal plans specified</p>
          )}
        </div>
        
        <div>
          <h4 className="font-medium text-fuchsia-200">Room Types</h4>
          {hotel.room_types && hotel.room_types.length > 0 ? (
            <div className="space-y-2 mt-2">
              {hotel.room_types.map((room, index) => (
                <div key={index} className="p-3 border border-purple-500/20 rounded-lg bg-purple-900/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{room.name || "Unnamed Room"}</h5>
                      <p className="text-sm text-gray-300">{room.description || "No description"}</p>
                      {room.roomCount && (
                        <p className="text-sm mt-1">Quantity: {room.roomCount}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Base Rate: ${room.baseRate || room.basePrice || "N/A"}</p>
                    </div>
                  </div>
                  
                  {room.rates && Object.keys(room.rates).length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-1">Rate Information:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(room.rates).map(([days, rate]) => (
                          <div key={days} className="text-xs">
                            {formatStayLength(days)}: ${String(rate)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {room.images && room.images.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-1">Images ({room.images.length}):</p>
                      <div className="grid grid-cols-3 gap-2">
                        {room.images.map((image, i) => (
                          <div key={i} className="aspect-square rounded overflow-hidden">
                            <img src={String(image)} alt={`Room ${index + 1} image ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No room types specified</p>
          )}
        </div>
        
        <div>
          <h4 className="font-medium text-fuchsia-200">Check-in Day Preference</h4>
          <p className="mt-1">{hotel.preferredWeekday || "Monday"}</p>
        </div>
      </div>
    </Card>
  );
};
