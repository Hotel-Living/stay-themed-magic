
import React from 'react';
import { Card } from "@/components/ui/card";
import { Hotel } from "@/integrations/supabase/types-custom";

interface AccommodationTermsProps {
  hotel: Hotel;
}

export const AccommodationTerms = ({ hotel }: AccommodationTermsProps) => {
  const formatArrayData = (arr: any[]) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
      return "None specified";
    }
    return arr.join(", ");
  };

  const renderStayLengths = (value: unknown): React.ReactNode => {
    const safeValue = value as string[] | number[] | null | undefined;
    
    if (!safeValue || !Array.isArray(safeValue) || safeValue.length === 0) {
      return null;
    }

    const safeStayLengths = safeValue.map(days => {
      const daysValue = typeof days === 'string' 
        ? parseInt(days, 10) 
        : typeof days === 'number' 
        ? days 
        : NaN;
      
      return { value: daysValue };
    });
    
    return (
      <div className="flex flex-wrap gap-2 mt-1">
        {safeStayLengths
          .filter(item => !isNaN(item.value))
          .map(item => (
            <span 
              key={item.value} 
              className="px-3 py-1 bg-fuchsia-900/50 rounded-full text-sm"
            >
              {item.value} {item.value === 1 ? 'day' : 'days'}
            </span>
          ))
        }
      </div>
    );
  };

  return (
    <Card className="p-6 bg-[#2A0F44]">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-purple-700">Accommodation Terms</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className="text-sm text-gray-400">Available Months</p>
          <p className="font-medium">{formatArrayData(hotel.available_months || [])}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Meal Plans</p>
          <p className="font-medium">{formatArrayData(hotel.meal_plans || [])}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Stay Lengths</p>
          {renderStayLengths(hotel.stay_lengths) as React.ReactNode}
        </div>
        <div>
          <p className="text-sm text-gray-400">Preferred Check-in Day</p>
          <p className="font-medium">{hotel.preferredWeekday || "Monday"}</p>
        </div>
      </div>
    </Card>
  );
};
