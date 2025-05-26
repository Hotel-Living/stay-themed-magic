
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
  const [selectedRoomType, setSelectedRoomType] = React.useState<string>("Double Room");
  const availableDates = availableMonths || [];

  // Get unique room types from pricing matrix
  const roomTypes = React.useMemo(() => {
    if (pricingMatrix && pricingMatrix.length > 0) {
      const types = [...new Set(pricingMatrix.map(item => item.roomType))];
      return types.length > 0 ? types : ["Double Room", "Single Room"];
    }
    return ["Double Room", "Single Room"];
  }, [pricingMatrix]);

  // Initialize with first available room type and longest duration
  React.useEffect(() => {
    if (roomTypes.length > 0 && !selectedRoomType) {
      setSelectedRoomType(roomTypes[0]);
    }
    if (stayDurations.length > 0 && selectedDuration === 0) {
      const longestDuration = Math.max(...stayDurations);
      setSelectedDuration(longestDuration);
    }
  }, [roomTypes, stayDurations, selectedRoomType, selectedDuration, setSelectedDuration]);

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
    
    return isPreferredDay && isAvailable;
  };

  // Get price for specific room type and duration from pricing matrix
  const getPriceForRoomAndDuration = (roomType: string, duration: number): number => {
    console.log(`Getting price for ${roomType}, ${duration} nights from pricingMatrix:`, pricingMatrix);
    
    if (pricingMatrix && pricingMatrix.length > 0) {
      // Look for exact matching room type and duration
      const matchingEntry = pricingMatrix.find(entry => 
        entry.roomType.toLowerCase() === roomType.toLowerCase() && 
        entry.stayLength === `${duration} days`
      );
      
      if (matchingEntry && matchingEntry.price > 0) {
        console.log(`Found pricing matrix price for ${roomType}, ${duration} nights:`, matchingEntry.price);
        return matchingEntry.price;
      }
      
      // If no exact match found, try with partial room type matching
      const partialMatch = pricingMatrix.find(entry => 
        entry.roomType.toLowerCase().includes(roomType.toLowerCase().split(' ')[0]) && 
        entry.stayLength === `${duration} days`
      );
      
      if (partialMatch && partialMatch.price > 0) {
        console.log(`Found partial match pricing for ${roomType}, ${duration} nights:`, partialMatch.price);
        return partialMatch.price;
      }
    }

    // Fallback to rates object
    const priceForDuration = rates[duration.toString()];
    if (priceForDuration && priceForDuration > 0) {
      console.log(`Found rates price for ${duration} nights:`, priceForDuration);
      return priceForDuration;
    }

    // Try to find rates with complex keys
    for (const [key, value] of Object.entries(rates)) {
      if (key.includes(`${duration}`) && key.toLowerCase().includes(roomType.toLowerCase().split(' ')[0])) {
        console.log(`Found complex key price for ${roomType}, ${duration} nights:`, key, value);
        return typeof value === 'string' ? parseFloat(value) : value;
      }
    }
    
    console.log(`No price found for ${roomType}, ${duration} nights`);
    return 0;
  };

  const calculatePrice = () => {
    const basePrice = getPriceForRoomAndDuration(selectedRoomType, selectedDuration);
    
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

  const handleRoomTypeChange = (value: string) => {
    setSelectedRoomType(value);
  };

  const handleDurationChange = (value: string) => {
    setSelectedDuration(parseInt(value));
  };

  const formatMealPlans = () => {
    if (!mealPlans || mealPlans.length === 0) return "";
    
    const mealPlanDisplayNames = mealPlans.map(plan => {
      switch (plan) {
        case 'breakfast-included':
          return 'Breakfast';
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
        
        {/* Display meal plans if available */}
        {mealPlans && mealPlans.length > 0 && (
          <p className="text-white/90 mb-4 text-sm">
            Meals: {formatMealPlans()}
          </p>
        )}

        <h3 className="text-lg font-semibold text-white mb-4">TARIFFS PER PERSON</h3>
      </div>

      {/* Room Type Selector */}
      <div>
        <Select value={selectedRoomType} onValueChange={handleRoomTypeChange}>
          <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
            <SelectValue placeholder="Select room type" />
          </SelectTrigger>
          <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
            {roomTypes.map((roomType) => (
              <SelectItem key={roomType} value={roomType} className="text-white hover:bg-[#860493] focus:bg-[#860493] data-[state=checked]:bg-[#860493] focus:text-white">
                {roomType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Duration Selector with Prices */}
      <div>
        <Select value={selectedDuration.toString()} onValueChange={handleDurationChange}>
          <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
            {stayDurations.map((duration) => {
              const price = getPriceForRoomAndDuration(selectedRoomType, duration);
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
          onSelect={(date) => {
            if (date && isDateSelectable(date)) {
              setCheckInDate(date);
            }
          }}
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
