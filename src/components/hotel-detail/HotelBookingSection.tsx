
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { format, addDays, isSameDay } from "date-fns";

interface HotelBookingSectionProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  selectedDuration: number;
  setSelectedDuration: (duration: number) => void;
  stayDurations: number[];
  rates: Record<string, number>;
  currency: string;
  handleBookClick: () => void;
  preferredWeekday: string;
  enablePriceIncrease?: boolean;
  priceIncreaseCap?: number;
  availableMonths?: string[];
  pricingMatrix?: Array<{
    roomType: string;
    stayLength: string;
    mealPlan: string;
    price: number;
  }>;
  mealPlans?: string[];
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
  preferredWeekday,
  enablePriceIncrease,
  priceIncreaseCap,
  availableMonths,
  pricingMatrix,
  mealPlans
}: HotelBookingSectionProps) {
  const availableDates = availableMonths || [];

  const isDateAvailable = (date: Date): boolean => {
    if (!availableDates || availableDates.length === 0) {
      return true;
    }

    const formattedDate = format(date, "MMMM").toLowerCase();
    return availableDates.some(month => month.toLowerCase() === formattedDate);
  };

  const isDateSelectable = (date: Date): boolean => {
    const day = format(date, "EEEE");
    const isPreferredDay = day === preferredWeekday;
    const isAvailable = isDateAvailable(date);
    
    // Be more forgiving - allow selection if either condition is met or if no restrictions
    return isPreferredDay && isAvailable;
  };

  const calculatePrice = () => {
    // Look for rate with the selected duration
    let basePrice = rates[selectedDuration.toString()] || 0;
    
    // If no exact match, try to find any rate with similar duration
    if (basePrice === 0) {
      // Try to find rates in the format "8", "16", etc.
      const availableRates = Object.keys(rates);
      console.log("Available rate keys:", availableRates);
      console.log("Looking for duration:", selectedDuration);
      
      // Find the closest match
      for (const key of availableRates) {
        if (key.includes(selectedDuration.toString())) {
          basePrice = rates[key] || 0;
          break;
        }
      }
    }

    console.log("Base price found:", basePrice, "for duration:", selectedDuration);

    if (enablePriceIncrease && basePrice > 0) {
      const dayOfMonth = checkInDate ? checkInDate.getDate() : 1;
      const increaseFactor = Math.min(dayOfMonth / 100, priceIncreaseCap || 0.3);
      basePrice *= (1 + increaseFactor);
    }

    return basePrice;
  };

  const handleDurationChange = (value: string) => {
    setSelectedDuration(parseInt(value));
  };

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "PPP") : "";
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateSelectable(date)) {
      setCheckInDate(date);
    }
  };

  const formatMealPlans = () => {
    if (!mealPlans || mealPlans.length === 0) return "";
    
    // Convert meal plan IDs to display names
    const mealPlanDisplayNames = mealPlans.map(plan => {
      switch (plan) {
        case 'breakfast-included':
          return 'Breakfast Included';
        case 'half-board':
          return 'Half Board';
        case 'full-board':
        case 'fullBoard':
          return 'Full Board';
        case 'all-inclusive':
          return 'All Inclusive';
        case 'laundry':
          return 'Laundry';
        case 'external-laundry':
          return 'External Laundry Service Available';
        default:
          // Handle any other format by capitalizing words
          return plan.split(/[-_]/).map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ');
      }
    });
    
    if (mealPlanDisplayNames.length === 1) {
      return mealPlanDisplayNames[0];
    }
    
    if (mealPlanDisplayNames.length === 2) {
      return `${mealPlanDisplayNames[0]} and ${mealPlanDisplayNames[1]}`;
    }
    
    const lastPlan = mealPlanDisplayNames[mealPlanDisplayNames.length - 1];
    const otherPlans = mealPlanDisplayNames.slice(0, -1);
    return `${otherPlans.join(", ")} and ${lastPlan}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-white">BOOKING</h2>
        <p className="text-white/80 mb-2">
          Weekly Check-In/Out Day: {preferredWeekday}
        </p>
        <p className="text-xl font-semibold text-white">
          {selectedDuration} nights – {currency === "USD" ? "$" : "€"}{calculatePrice().toFixed(2)}
        </p>
        
        {/* Display meal plans if available */}
        {mealPlans && mealPlans.length > 0 && (
          <p className="text-white/90 mt-2 text-sm">
            Meals: {formatMealPlans()}
          </p>
        )}
      </div>

      <div>
        <Select value={selectedDuration.toString()} onValueChange={handleDurationChange}>
          <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
            {stayDurations.map((duration) => (
              <SelectItem key={duration} value={duration.toString()} className="text-white hover:bg-[#860493] focus:bg-[#860493] data-[state=checked]:bg-[#860493] focus:text-white">
                {duration} nights
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <Calendar
          mode="single"
          selected={checkInDate}
          onSelect={handleDateSelect}
          disabled={date => !isDateSelectable(date)}
          className="border rounded-md w-full mx-auto bg-fuchsia-950/30 text-white"
        />
      </Card>

      <Button className="w-full bg-fuchsia-500 hover:bg-fuchsia-700 text-white" onClick={handleBookClick}>
        Book Now
      </Button>
    </div>
  );
}
