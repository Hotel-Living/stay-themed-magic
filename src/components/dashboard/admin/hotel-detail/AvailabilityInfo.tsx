
import React from "react";
import { CalendarIcon } from "lucide-react";

interface AvailabilityInfoProps {
  hotel: any;
}

export function AvailabilityInfo({ hotel }: AvailabilityInfoProps) {
  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-purple-400" />
        Availability
      </h3>
      <div>
        <p className="text-sm text-gray-400 mb-2">Available Months</p>
        {hotel.available_months && hotel.available_months.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {hotel.available_months.map((month: string) => (
              <span key={month} className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm">
                {month}
              </span>
            ))}
          </div>
        ) : (
          <p>No available months specified.</p>
        )}
      </div>
    </div>
  );
}
