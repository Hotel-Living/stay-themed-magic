
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/dynamicPricing";
import { cn } from "@/lib/utils";

interface HotelBookingSectionProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  selectedDuration: number;
  setSelectedDuration: (duration: number) => void;
  stayDurations: number[];
  rates: Record<string, number>;
  currency: string;
  handleBookClick: () => void;
  preferredWeekday?: string;
}

export function HotelBookingSection({ 
  checkInDate, 
  setCheckInDate, 
  selectedDuration, 
  setSelectedDuration, 
  stayDurations,
  rates,
  currency,
  handleBookClick,
  preferredWeekday = "Monday"
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
      <h2 className="text-lg font-semibold mb-2 text-center text-white">CHECK-IN</h2>
      <p className="text-xs text-center text-white mb-2">
        Check-in/out day: {preferredWeekday}
      </p>
      <Calendar 
        className="mb-4" 
        selected={checkInDate}
        onSelect={setCheckInDate}
        disabled={(date) => date < new Date()}
      />

      <h2 className="text-lg font-semibold mb-2 text-white">Stay duration</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {stayDurations.map((d) => (
          <Button 
            variant={selectedDuration === d ? "default" : "outline"} 
            key={d}
            onClick={() => setSelectedDuration(d)}
            className={cn(
              "border-white",
              selectedDuration === d && "bg-white text-fuchsia-900"
            )}
          >
            {d}
          </Button>
        ))}
      </div>
      <p className="text-sm text-white mb-2">Check-out: {calculateCheckoutDate()}</p>

      <p className="text-2xl font-bold text-white">
        {rates && rates[selectedDuration] ? 
          formatCurrency(rates[selectedDuration], currency) : 
          "Price not available"
        } per person
      </p>
      <Button 
        className="mt-3 w-full bg-white text-[#000066] hover:bg-white/90" 
        onClick={handleBookClick}
      >
        Book
      </Button>
      <div className="text-xs text-white mt-2 flex flex-col">
        <span>This hotel uses dynamic pricing.</span>
        <span>Book early to secure the best rate!</span>
      </div>
    </div>
  );
}
