
import React from "react";

interface PricingMatrixEntry {
  roomType: string;
  stayLength: string;
  mealPlan: string;
  price: number;
}

interface TariffOption {
  roomType: string;
  duration: string;
  mealPlan: string;
  price: number;
  displayValue: string;
  originalEntry: PricingMatrixEntry;
}

export function useTariffOptions(pricingMatrix?: PricingMatrixEntry[]) {
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

    const options = pricingMatrix
      .filter(entry => entry.price > 0)
      .map(entry => {
        const formattedRoomType = formatRoomType(entry.roomType);
        const formattedDuration = formatDuration(entry.stayLength);
        const formattedMealPlan = formatMealPlan(entry.mealPlan);
        
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
      .sort((a, b) => a.price - b.price);

    console.log("Final tariff options:", options);
    return options;
  }, [pricingMatrix]);

  return tariffOptions;
}
