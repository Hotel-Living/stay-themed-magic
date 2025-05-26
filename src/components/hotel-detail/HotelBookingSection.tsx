
import React from "react";
import { Button } from "@/components/ui/button";
import { TariffSelector } from "./booking/TariffSelector";
import { BookingCalendar } from "./booking/BookingCalendar";
import { BookingInfo } from "./booking/BookingInfo";
import { useTariffOptions } from "./booking/hooks/useTariffOptions";

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
  const tariffOptions = useTariffOptions(pricingMatrix);

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

  return (
    <div className="p-6 space-y-6">
      <BookingInfo
        checkInDate={checkInDate}
        stayDurations={stayDurations}
        selectedDuration={selectedDuration}
        mealPlans={mealPlans}
        preferredWeekday={preferredWeekday}
        enable_price_increase={enable_price_increase}
      />

      <TariffSelector
        pricingMatrix={pricingMatrix}
        selectedRoomAndPrice={selectedRoomAndPrice}
        onTariffChange={handleTariffSelection}
      />

      <BookingCalendar
        checkInDate={checkInDate}
        onDateSelect={setCheckInDate}
        availableMonths={availableMonths}
        preferredWeekday={preferredWeekday}
      />

      <Button className="w-full bg-fuchsia-500 hover:bg-fuchsia-700 text-white" onClick={handleBookClick}>
        Book Now
      </Button>
    </div>
  );
}
