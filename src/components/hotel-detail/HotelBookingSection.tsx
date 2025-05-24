
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { 
  formatCurrency, 
  calculateDynamicPrice,
  calculateTotalNightsInMonth,
  calculateNightsSold
} from "@/utils/dynamicPricing";
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
  enablePriceIncrease?: boolean;
  priceIncreaseCap?: number;
  roomCount?: number;
  bookings?: Array<{ startDate: Date; endDate: Date }>;
  pricingMatrix?: Array<{ 
    roomType: string; 
    stayLength: string; 
    mealPlan: string; 
    price: number 
  }>;
  selectedRoomType?: string;
  selectedMealPlan?: string;
  availableMonths?: string[];
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
  preferredWeekday = "Monday",
  enablePriceIncrease = false,
  priceIncreaseCap = 20,
  roomCount = 10,
  bookings = [],
  pricingMatrix = [],
  selectedRoomType = "Standard",
  selectedMealPlan = "Breakfast only",
  availableMonths = []
}: HotelBookingSectionProps) {
  
  // Map weekday names to numbers (0 = Sunday, 1 = Monday, etc.)
  const weekdayMap: Record<string, number> = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
  };

  // Get the preferred weekday number
  const preferredWeekdayNum = weekdayMap[preferredWeekday] ?? 1; // Default to Monday

  // Function to disable dates that should NOT be selectable
  const isDateDisabled = (date: Date) => {
    // Disable dates in the past
    if (date < new Date()) return true;
    
    // Disable dates that don't match the preferred weekday
    if (date.getDay() !== preferredWeekdayNum) return true;
    
    // If available months are specified, disable dates not in those months
    if (availableMonths && availableMonths.length > 0) {
      const monthName = format(date, 'MMMM').toLowerCase();
      if (!availableMonths.map(m => m.toLowerCase()).includes(monthName)) {
        return true;
      }
    }
    
    return false;
  };

  // Calculate check-out date ensuring it falls on the correct weekday
  const calculateCheckoutDate = () => {
    if (!checkInDate) return "";
    
    // Start with the check-in date and add the duration
    const checkoutDate = new Date(checkInDate);
    checkoutDate.setDate(checkoutDate.getDate() + selectedDuration);
    
    // Ensure the checkout date is on the same weekday as check-in
    const daysDifference = checkoutDate.getDay() - checkInDate.getDay();
    if (daysDifference !== 0) {
      // Adjust to the next occurrence of the preferred weekday
      let daysToAdd = preferredWeekdayNum - checkoutDate.getDay();
      if (daysToAdd <= 0) {
        daysToAdd += 7; // Move to next week if needed
      }
      checkoutDate.setDate(checkoutDate.getDate() + daysToAdd);
    }
    
    return format(checkoutDate, "MM/dd/yyyy");
  };

  // Auto-select duration if only one option available
  React.useEffect(() => {
    if (stayDurations.length === 1 && selectedDuration !== stayDurations[0]) {
      setSelectedDuration(stayDurations[0]);
    }
  }, [stayDurations, selectedDuration, setSelectedDuration]);

  // Helper function to get price for a specific duration
  const getPriceForDuration = (duration: number) => {
    let basePrice = null;
    
    // First check if we have a specific price in the pricingMatrix
    if (pricingMatrix && pricingMatrix.length > 0) {
      const stayLengthStr = `${duration} days`;
      const matrixEntry = pricingMatrix.find(
        entry =>
          entry.roomType === selectedRoomType &&
          entry.stayLength === stayLengthStr &&
          entry.mealPlan === selectedMealPlan
      );
      
      if (matrixEntry?.price) {
        basePrice = matrixEntry.price;
      }
    }
    
    // If no pricing matrix entry, check rates object with enhanced logic
    if (!basePrice && rates) {
      // First try simple duration keys
      const simplePossibleKeys = [
        duration.toString(),
        duration,
        `${duration}`,
        `price_${duration}`,
        `${duration}_days`
      ];
      
      for (const key of simplePossibleKeys) {
        if (rates[key] && rates[key] > 0) {
          basePrice = rates[key];
          break;
        }
      }
      
      // If still no price found, try to parse complex keys that include duration
      if (!basePrice) {
        // Look for keys that contain the duration in the format "X days"
        const durationPattern = `${duration} days`;
        
        for (const [key, value] of Object.entries(rates)) {
          if (key.includes(durationPattern) && value > 0) {
            // Convert string values to numbers if needed
            const priceValue = typeof value === 'string' ? parseFloat(value) : value;
            if (!isNaN(priceValue) && priceValue > 0) {
              basePrice = priceValue;
              break;
            }
          }
        }
        
        // If still no exact match, try any key that contains the duration number
        if (!basePrice) {
          for (const [key, value] of Object.entries(rates)) {
            if (key.includes(duration.toString()) && value > 0) {
              const priceValue = typeof value === 'string' ? parseFloat(value) : value;
              if (!isNaN(priceValue) && priceValue > 0) {
                basePrice = priceValue;
                break;
              }
            }
          }
        }
      }
    }
    
    if (!basePrice || basePrice <= 0) {
      return null;
    }
    
    return basePrice;
  };

  // Enhanced price retrieval logic to handle complex rate keys
  const getDisplayPrice = () => {
    console.log("Getting display price for duration:", selectedDuration);
    console.log("Available rates:", rates);
    console.log("Pricing matrix:", pricingMatrix);
    
    const basePrice = getPriceForDuration(selectedDuration);
    
    if (!basePrice || basePrice <= 0) {
      console.log("No valid base price found");
      return "Price not available";
    }
    
    // Apply dynamic pricing if enabled
    if (!enablePriceIncrease || !checkInDate) {
      console.log("Returning base price:", basePrice);
      return formatCurrency(basePrice, currency);
    }
    
    const year = checkInDate.getFullYear();
    const month = checkInDate.getMonth();
    
    const totalNights = calculateTotalNightsInMonth(roomCount, year, month);
    const soldNights = calculateNightsSold(bookings, year, month);
    
    const finalPrice = calculateDynamicPrice(
      basePrice, 
      totalNights, 
      soldNights, 
      priceIncreaseCap
    );
    
    console.log("Returning dynamic price:", finalPrice);
    return formatCurrency(finalPrice, currency);
  };

  // Determine the stay duration label based on whether a date is selected
  const getStayDurationLabel = () => {
    return checkInDate ? "Stay duration?" : "Stay duration";
  };
  
  return (
    <div className="bg-fuchsia-950/30 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-2 text-center text-white">CHECK-IN</h2>
      <p className="text-xs text-center text-white mb-2">
        Check-in/out day: {preferredWeekday}
      </p>
      
      {/* Stay Duration Prices Display */}
      <div className="mb-4 text-center">
        {stayDurations.map((duration) => {
          const price = getPriceForDuration(duration);
          if (price) {
            return (
              <div key={duration} className="text-sm text-white mb-1">
                {duration} nights – {formatCurrency(price, currency)}
              </div>
            );
          }
          return null;
        }).filter(Boolean).length > 0 ? null : (
          <div className="text-sm text-white/70 mb-1">
            Prices available upon duration selection
          </div>
        )}
        {stayDurations.map((duration) => {
          const price = getPriceForDuration(duration);
          if (price) {
            return (
              <div key={duration} className="text-sm text-white mb-1">
                {duration} nights – {formatCurrency(price, currency)}
              </div>
            );
          }
          return null;
        })}
      </div>

      <Calendar 
        className="mb-4" 
        selected={checkInDate}
        onSelect={setCheckInDate}
        disabled={isDateDisabled}
      />

      <h2 className="text-lg font-semibold mb-2 text-white">{getStayDurationLabel()}</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {stayDurations.map((d) => (
          <Button 
            variant={selectedDuration === d ? "default" : "outline"} 
            key={d}
            onClick={() => setSelectedDuration(d)}
            className={cn(
              "border-white transition-colors",
              selectedDuration === d 
                ? "bg-[#8000B0] text-white hover:bg-[#5A0080]" 
                : "bg-[#8000B0] text-white hover:bg-[#5A0080] border-[#8000B0]"
            )}
          >
            {d}
          </Button>
        ))}
      </div>
      <p className="text-sm text-white mb-2">Check-out: {calculateCheckoutDate()}</p>

      <p className="text-2xl font-bold text-white">
        {getDisplayPrice()} per person
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
