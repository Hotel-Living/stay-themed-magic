
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
  const [selectedRoomAndPrice, setSelectedRoomAndPrice] = React.useState<string>("");
  const availableDates = availableMonths || [];

  // Get unique room types with their prices from pricing matrix
  const roomTypesWithPrices = React.useMemo(() => {
    if (pricingMatrix && pricingMatrix.length > 0) {
      const roomMap = new Map<string, number>();
      
      // Get the longest duration available for each room type
      const longestDuration = Math.max(...stayDurations);
      const targetDuration = `${longestDuration} days`;
      
      // Find the price for each room type at the longest duration
      pricingMatrix.forEach(entry => {
        if (entry.stayLength === targetDuration && entry.price > 0) {
          if (!roomMap.has(entry.roomType) || roomMap.get(entry.roomType)! < entry.price) {
            roomMap.set(entry.roomType, entry.price);
          }
        }
      });
      
      // Convert to array and ensure Double Room comes first
      const roomArray = Array.from(roomMap.entries());
      roomArray.sort((a, b) => {
        if (a[0].toLowerCase().includes('double')) return -1;
        if (b[0].toLowerCase().includes('double')) return 1;
        return a[0].localeCompare(b[0]);
      });
      
      return roomArray.map(([roomType, price]) => ({
        roomType,
        price,
        value: `${roomType} – ${price}`
      }));
    }
    return [];
  }, [pricingMatrix, stayDurations]);

  // Initialize with first available room type
  React.useEffect(() => {
    if (roomTypesWithPrices.length > 0 && !selectedRoomAndPrice) {
      setSelectedRoomAndPrice(roomTypesWithPrices[0].value);
    }
    if (stayDurations.length > 0 && selectedDuration === 0) {
      const longestDuration = Math.max(...stayDurations);
      setSelectedDuration(longestDuration);
    }
  }, [roomTypesWithPrices, stayDurations, selectedRoomAndPrice, selectedDuration, setSelectedDuration]);

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

  // Extract selected room type and price from the combined selection
  const getSelectedRoomInfo = () => {
    if (!selectedRoomAndPrice) return { roomType: "", price: 0 };
    
    const parts = selectedRoomAndPrice.split(' – ');
    if (parts.length === 2) {
      return {
        roomType: parts[0],
        price: parseFloat(parts[1])
      };
    }
    return { roomType: "", price: 0 };
  };

  const calculatePrice = () => {
    const { price } = getSelectedRoomInfo();
    
    if (price === 0) {
      return 0;
    }

    let finalPrice = price;

    if (enable_price_increase && checkInDate) {
      const dayOfMonth = checkInDate.getDate();
      const increaseFactor = Math.min(dayOfMonth / 100, price_increase_cap || 0.3);
      finalPrice *= (1 + increaseFactor);
    }

    return finalPrice;
  };

  const handleRoomAndPriceChange = (value: string) => {
    setSelectedRoomAndPrice(value);
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

      {/* Room Type with Price Selector */}
      <div>
        <Select value={selectedRoomAndPrice} onValueChange={handleRoomAndPriceChange}>
          <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30">
            <SelectValue placeholder="Select room type and price" />
          </SelectTrigger>
          <SelectContent className="bg-[#860493] border border-fuchsia-800/30">
            {roomTypesWithPrices.map((room) => (
              <SelectItem key={room.value} value={room.value} className="text-white hover:bg-[#860493] focus:bg-[#860493] data-[state=checked]:bg-[#860493] focus:text-white">
                {room.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Duration Selector */}
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
