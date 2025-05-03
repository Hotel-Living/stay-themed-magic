
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/dynamicPricing";

interface HotelBookingSectionProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  selectedDuration: number;
  setSelectedDuration: (duration: number) => void;
  stayDurations: number[];
  rates: Record<string, number>;
  currency: string;
  handleBookClick: () => void;
}

export function HotelBookingSection({ 
  checkInDate, 
  setCheckInDate, 
  selectedDuration, 
  setSelectedDuration, 
  stayDurations,
  rates,
  currency,
  handleBookClick
}: HotelBookingSectionProps) {
  
  // Calculate check-out date based on check-in and duration
  const calculateCheckoutDate = () => {
    if (!checkInDate) return "";
    const checkoutDate = new Date(checkInDate);
    checkoutDate.setDate(checkoutDate.getDate() + (selectedDuration || 8));
    return format(checkoutDate, "MM/dd/yyyy");
  };
  
  return (
    <div className="bg-fuchsia-950/30 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-2 text-purple-100">Check-in</h2>
      <Calendar 
        className="mb-4" 
        selected={checkInDate}
        onSelect={setCheckInDate}
        disabled={(date) => date < new Date()}
      />

      <h2 className="text-lg font-semibold mb-2 text-purple-100">Stay duration</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {stayDurations.map((d) => (
          <Button 
            variant={selectedDuration === d ? "default" : "outline"} 
            key={d}
            onClick={() => setSelectedDuration(d)}
          >
            {d}
          </Button>
        ))}
      </div>
      <p className="text-sm text-purple-300 mb-2">Check-out: {calculateCheckoutDate()}</p>

      <p className="text-2xl font-bold text-purple-100">
        {rates && rates[selectedDuration] ? 
          formatCurrency(rates[selectedDuration], currency) : 
          "Price not available"
        } per person
      </p>
      <Button className="mt-3 w-full" onClick={handleBookClick}>Book</Button>
      <p className="text-xs text-purple-400 mt-2">
        This hotel uses dynamic pricing. Book early to secure the best rate.
      </p>
    </div>
  );
}
