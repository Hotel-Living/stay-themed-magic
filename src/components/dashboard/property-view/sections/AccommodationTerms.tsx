
import React from "react";
import { format, parse, parseISO } from "date-fns";
import { Card } from "@/components/ui/card";

export function AccommodationTerms({ hotel }) {
  // Format stay lengths for display
  const formatStayLength = (days) => {
    return days === 1 ? `${days} day` : `${days} days`;
  };

  // Format availability dates
  const formatAvailabilityDates = () => {
    const allDates = new Set<string>();
    
    // Add full month availability dates
    if (hotel.available_months && hotel.available_months.length > 0) {
      hotel.available_months.forEach((month: string) => {
        if (month) {
          const normalizedMonth = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
          allDates.add(`${normalizedMonth} (Full Month)`);
        }
      });
    }
    
    // Add specific dates from room types
    if (hotel.room_types && hotel.room_types.length > 0) {
      hotel.room_types.forEach(room => {
        if (room.availabilityDates) {
          room.availabilityDates.forEach((date: string) => {
            try {
              const parsedDate = parseISO(date);
              const formattedDate = format(parsedDate, 'MMMM d, yyyy');
              allDates.add(formattedDate);
            } catch (error) {
              console.error('Error parsing date:', error);
            }
          });
        }
      });
    }
    
    return Array.from(allDates);
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4">Accommodation Terms</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Availability Dates */}
        <Card className="p-4 bg-fuchsia-950/50">
          <h4 className="font-semibold text-lg mb-3">Availability Dates</h4>
          {formatAvailabilityDates().length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {formatAvailabilityDates().map((date) => (
                <span key={date} className="bg-fuchsia-900/50 text-white px-3 py-1 rounded-full text-sm">
                  {date}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No availability dates specified</p>
          )}
        </Card>

        {/* Stay Lengths */}
        <Card className="p-4 bg-fuchsia-950/50">
          <h4 className="font-semibold text-lg mb-3">Stay Lengths</h4>
          {hotel.stay_lengths && hotel.stay_lengths.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {hotel.stay_lengths.map((length) => (
                <span key={length} className="bg-fuchsia-900/50 text-white px-3 py-1 rounded-full text-sm">
                  {formatStayLength(length)}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No stay lengths specified</p>
          )}
        </Card>

        {/* Meal Plans */}
        <Card className="p-4 bg-fuchsia-950/50">
          <h4 className="font-semibold text-lg mb-3">Meal Plans</h4>
          {hotel.meal_plans && hotel.meal_plans.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {hotel.meal_plans.map((plan) => (
                <span key={plan} className="bg-fuchsia-900/50 text-white px-3 py-1 rounded-full text-sm">
                  {plan}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No meal plans specified</p>
          )}
        </Card>

        {/* Check-in Day */}
        <Card className="p-4 bg-fuchsia-950/50">
          <h4 className="font-semibold text-lg mb-3">Check-in Day</h4>
          <span className="bg-fuchsia-900/50 text-white px-3 py-1 rounded-full text-sm">
            {hotel.preferredWeekday || "Monday"}
          </span>
        </Card>
      </div>
    </div>
  );
}
