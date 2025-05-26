
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

  // Build complete tariff options from pricingMatrix
  const tariffOptions = React.useMemo(() => {
    console.log("=== TARIFF DROPDOWN REBUILD ===");
    console.log("Source pricingMatrix:", pricingMatrix);
    
    if (!pricingMatrix || !Array.isArray(pricingMatrix) || pricingMatrix.length === 0) {
      console.log("No pricingMatrix available");
      return [];
    }

    const formatRoomType = (roomType: string): string => {
      return roomType.charAt(0).toUpperCase() + roomType.slice(1).toLowerCase() + " Room";
    };

    const formatDuration = (stayLength: string): string => {
      // Convert "32 days" to "32 nights"
      return stayLength.replace(/days?/i, "nights");
    };

    const formatMealPlan = (mealPlan: string): string => {
      switch (mealPlan.toLowerCase()) {
        case 'breakfast-included':
        case 'breakfast':
          return 'Breakfast';
        case 'half-board':
          return 'Half Board';
        case 'full-board':
        case 'fullboard':
          return 'Full Board';
        case 'all-inclusive':
          return 'All Inclusive';
        default:
          return mealPlan.split(/[-_]/).map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ');
      }
    };

    // Process each entry in pricingMatrix to create complete tariff options
    const options = pricingMatrix
      .filter(entry => entry.price > 0) // Only valid prices
      .map(entry => {
        const formattedRoomType = formatRoomType(entry.roomType);
        const formattedDuration = formatDuration(entry.stayLength);
        const formattedMealPlan = formatMealPlan(entry.mealPlan);
        
        // Create the display value: "Double Room – 32 nights – Breakfast – 990"
        const displayValue = `${formattedRoomType} – ${formattedDuration} – ${formattedMealPlan} – ${entry.price}`;
        
        console.log("Created tariff option:", displayValue);
        
        return {
          roomType: formattedRoomType,
          duration: formattedDuration,
          mealPlan: formattedMealPlan,
          price: entry.price,
          displayValue,
          originalEntry: entry
        };
      })
      .sort((a, b) => a.price - b.price); // Sort by price, lowest first

    console.log("Final tariff options:", options);
    return options;
  }, [pricingMatrix]);

  // Initialize with cheapest option (first in sorted array)
  React.useEffect(() => {
    if (tariffOptions.length > 0 && !selectedRoomAndPrice) {
      setSelectedRoomAndPrice(tariffOptions[0].displayValue);
      console.log("Setting default tariff selection:", tariffOptions[0].displayValue);
    }
    if (stayDurations.length > 0 && selectedDuration === 0) {
      const longestDuration = Math.max(...stayDurations);
      setSelectedDuration(longestDuration);
    }
  }, [tariffOptions, stayDurations, selectedRoomAndPrice, selectedDuration, setSelectedDuration]);

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

  // Extract selected tariff info from the selected display value
  const getSelectedTariffInfo = () => {
    if (!selectedRoomAndPrice) return { roomType: "", price: 0, duration: "", mealPlan: "" };
    
    const selectedOption = tariffOptions.find(option => option.displayValue === selectedRoomAndPrice);
    if (selectedOption) {
      return {
        roomType: selectedOption.roomType,
        price: selectedOption.price,
        duration: selectedOption.duration,
        mealPlan: selectedOption.mealPlan
      };
    }
    return { roomType: "", price: 0, duration: "", mealPlan: "" };
  };

  const calculatePrice = () => {
    const { price } = getSelectedTariffInfo();
    
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

  const handleTariffSelection = (value: string) => {
    console.log("Tariff selection changed to:", value);
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

      {/* Complete Tariff Selector */}
      <div>
        <Select value={selectedRoomAndPrice} onValueChange={handleTariffSelection}>
          <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 text-white">
            <SelectValue placeholder="Select tariff option" />
          </SelectTrigger>
          <SelectContent className="bg-[#860493] border border-fuchsia-800/30 z-50">
            {tariffOptions.map((option) => (
              <SelectItem 
                key={option.displayValue} 
                value={option.displayValue} 
                className="text-white hover:bg-fuchsia-700/50 focus:bg-fuchsia-700/50 data-[state=checked]:bg-fuchsia-700/50 focus:text-white cursor-pointer"
              >
                {option.displayValue}
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
