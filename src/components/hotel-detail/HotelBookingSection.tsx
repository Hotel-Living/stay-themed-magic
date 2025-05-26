
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

  // Get unique room types with their prices from pricing matrix or rates, sorted by price
  const roomTypesWithPrices = React.useMemo(() => {
    console.log("Processing pricingMatrix:", pricingMatrix);
    console.log("Available rates:", rates);
    
    if (pricingMatrix && pricingMatrix.length > 0) {
      const roomMap = new Map<string, number>();
      
      // Get all room types with their prices from the pricing matrix
      pricingMatrix.forEach(entry => {
        if (entry.price > 0) {
          // If room type doesn't exist or current price is lower, update it
          if (!roomMap.has(entry.roomType) || roomMap.get(entry.roomType)! > entry.price) {
            roomMap.set(entry.roomType, entry.price);
          }
        }
      });
      
      console.log("Room map from pricing matrix:", Array.from(roomMap.entries()));
      
      // Convert to array and sort by price (cheapest first)
      const roomArray = Array.from(roomMap.entries()).sort((a, b) => a[1] - b[1]);
      
      return roomArray.map(([roomType, price]) => ({
        roomType,
        price,
        value: `${roomType} – ${price}`
      }));
    }
    
    // Fallback: extract from rates if pricing matrix is not available
    if (rates && Object.keys(rates).length > 0) {
      console.log("Fallback to rates processing:", rates);
      const roomMap = new Map<string, number>();
      
      Object.entries(rates).forEach(([key, price]) => {
        // Extract room type from rate key (e.g., "double-32 days-breakfast" -> "double")
        // Split by "-" and take the first part as room type
        const parts = key.split('-');
        if (parts.length > 0) {
          const rawRoomType = parts[0].toLowerCase();
          // Capitalize the room type properly
          const roomType = rawRoomType.charAt(0).toUpperCase() + rawRoomType.slice(1);
          const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
          
          if (!isNaN(numericPrice)) {
            if (!roomMap.has(roomType) || roomMap.get(roomType)! > numericPrice) {
              roomMap.set(roomType, numericPrice);
            }
          }
        }
      });
      
      console.log("Room map from rates:", Array.from(roomMap.entries()));
      
      const roomArray = Array.from(roomMap.entries()).sort((a, b) => a[1] - b[1]);
      
      return roomArray.map(([roomType, price]) => ({
        roomType,
        price,
        value: `${roomType} – ${price}`
      }));
    }
    
    return [];
  }, [pricingMatrix, rates]);

  console.log("Final roomTypesWithPrices:", roomTypesWithPrices);

  // Initialize with first available room type (cheapest)
  React.useEffect(() => {
    if (roomTypesWithPrices.length > 0 && !selectedRoomAndPrice) {
      setSelectedRoomAndPrice(roomTypesWithPrices[0].value);
      console.log("Setting default room selection:", roomTypesWithPrices[0].value);
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
    console.log("Room selection changed to:", value);
    setSelectedRoomAndPrice(value);
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

  // Calculate checkout date using the longest duration since we removed the duration selector
  const longestDuration = stayDurations.length > 0 ? Math.max(...stayDurations) : selectedDuration;
  const checkoutDate = checkInDate ? addDays(checkInDate, longestDuration) : null;

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
          <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#860493] border border-fuchsia-800/30 z-50">
            {roomTypesWithPrices.map((room) => (
              <SelectItem 
                key={room.value} 
                value={room.value} 
                className="text-white hover:bg-fuchsia-700/50 focus:bg-fuchsia-700/50 data-[state=checked]:bg-fuchsia-700/50 focus:text-white cursor-pointer"
              >
                {room.value}
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
