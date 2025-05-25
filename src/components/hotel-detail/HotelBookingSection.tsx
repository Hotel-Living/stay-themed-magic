
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

    const formattedDate = format(date, "MMMM");
    return availableDates.includes(formattedDate);
  };

  const isDateSelectable = (date: Date): boolean => {
    const day = format(date, "EEEE");
    const isPreferredDay = day === preferredWeekday;
    return isPreferredDay && isDateAvailable(date);
  };

  const calculatePrice = () => {
    let basePrice = rates[selectedDuration.toString()] || 0;

    if (enablePriceIncrease) {
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

  const formatMealPlanText = (mealPlan: string) => {
    // Handle different meal plan formats and convert to user-friendly text
    const mealPlanMap: Record<string, string> = {
      'fullBoard': 'Full Board',
      'full-board': 'Full Board',
      'halfBoard': 'Half Board',
      'half-board': 'Half Board',
      'breakfastIncluded': 'Breakfast Included',
      'breakfast-included': 'Breakfast Included',
      'allInclusive': 'All Inclusive',
      'all-inclusive': 'All Inclusive',
      'laundry': 'Laundry',
      'external-laundry': 'External Laundry Service Available'
    };

    // Return mapped value or format the string properly
    return mealPlanMap[mealPlan] || mealPlan.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
  };

  const formatMealPlans = () => {
    if (!mealPlans || mealPlans.length === 0) return "";
    
    const formattedPlans = mealPlans.map(plan => formatMealPlanText(plan));
    
    if (formattedPlans.length === 1) {
      return formattedPlans[0];
    }
    
    if (formattedPlans.length === 2) {
      return `${formattedPlans[0]} and ${formattedPlans[1]}`;
    }
    
    const lastPlan = formattedPlans[formattedPlans.length - 1];
    const otherPlans = formattedPlans.slice(0, -1);
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
