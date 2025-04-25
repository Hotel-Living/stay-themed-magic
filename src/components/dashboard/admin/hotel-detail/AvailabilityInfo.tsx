
import React from "react";
import { CalendarIcon } from "lucide-react";
import { AdminHotelDetail } from "@/types/hotel";

interface AvailabilityInfoProps {
  hotel: AdminHotelDetail;
}

export function AvailabilityInfo({ hotel }: AvailabilityInfoProps) {
  console.log("Rendering availability with months:", hotel.available_months);
  
  // Function to normalize, capitalize, and deduplicate month names
  const normalizeMonths = (months: string[] = []): string[] => {
    if (!months || !months.length) return [];
    
    // Step 1: Normalize to title case (e.g., "January")
    const normalizedMonths = months.map(month => {
      if (!month) return "";
      return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
    });
    
    // Step 2: Remove duplicates using a Set
    return [...new Set(normalizedMonths)].filter(month => month !== "");
  };

  const availableMonths = normalizeMonths(hotel.available_months);
  console.log("Normalized available months:", availableMonths);

  return (
    <div className="rounded-xl p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700 flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-purple-400" />
        Availability
      </h3>
      <div>
        <p className="text-sm text-gray-400 mb-2">Available Months</p>
        {availableMonths && availableMonths.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {availableMonths.map((month: string) => (
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
