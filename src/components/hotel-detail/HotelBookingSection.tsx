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
  enable_price_increase?: boolean;
  price_increase_cap?: number;
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
  enable_price_increase,
  price_increase_cap,
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

  // Helper function to get the lowest double room price for a specific duration
  const getLowestDoubleRoomPrice = (duration: number): number => {
    console.log(`Getting price for ${duration} nights from rates:`, rates);
    
    // Look for the exact duration in rates
    const priceForDuration = rates[duration.toString()];
    if (priceForDuration && priceForDuration > 0) {
      console.log(`Found direct price for ${duration} nights:`, priceForDuration);
      return priceForDuration;
    }
    
    // Try to find rates with complex keys like "double-32 days-breakfast"
    for (const [key, value] of Object.entries(rates)) {
      if (key.includes(`${duration}`) && key.toLowerCase().includes('double')) {
        console.log(`Found complex key price for ${duration} nights:`, key, value);
        return typeof value === 'string' ? parseFloat(value) : value;
      }
    }
    
    console.log(`No price found for ${duration} nights`);
    return 0;
  };

  const calculatePrice = () => {
    const basePrice = getLowestDoubleRoomPrice(selectedDuration);
    
    if (basePrice === 0) {
      return 0;
    }

    let finalPrice = basePrice;

    if (enable_price_increase && checkInDate) {
      const dayOfMonth = checkInDate.getDate();
      const increaseFactor = Math.min(dayOfMonth / 100, price_increase_cap || 0.3);
      finalPrice *= (1 + increaseFactor);
    }

    return finalPrice;
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

  // Calculate checkout date
  const checkoutDate = checkInDate ? addDays(checkInDate, selectedDuration) : null;

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
            {stayDurations.map((duration) => {
              const price = getLowestDoubleRoomPrice(duration);
              return (
                <SelectItem key={duration} value={duration.toString()} className="text-white hover:bg-[#860493] focus:bg-[#860493] data-[state=checked]:bg-[#860493] focus:text-white">
                  {price > 0 ? `${duration} nights — ${price}` : `${duration} nights`}
                </SelectItem>
              );
            })}
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

      {/* Checkout Date Display */}
      {checkInDate && checkoutDate && (
        <div className="text-center space-y-2">
          <div className="text-white/90 text-sm">
            <div>Check-in: {format(checkInDate, "PPP")}</div>
            <div>Check-out: {format(checkoutDate, "PPP")}</div>
          </div>
        </div>
      )}

      {/* Dynamic Pricing Message */}
      {enable_price_increase && (
        <div className="bg-fuchsia-950/30 border border-fuchsia-800/30 rounded-lg p-3">
          <p className="text-white/90 text-sm text-center">
            This property uses dynamic pricing based on demand. Book early to secure the best rates!
          </p>
        </div>
      )}

      <Button className="w-full bg-fuchsia-500 hover:bg-fuchsia-700 text-white" onClick={handleBookClick}>
        Book Now
      </Button>
    </div>
  );
}
