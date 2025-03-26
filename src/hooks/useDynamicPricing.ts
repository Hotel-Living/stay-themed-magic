
import { useState } from "react";

export function useDynamicPricing() {
  const [enableDynamicPricing, setEnableDynamicPricing] = useState(false);
  const [dynamicPricingPercentage, setDynamicPricingPercentage] = useState(20);

  const calculateExamplePrices = () => {
    const totalRooms = 10;
    const basePrice = 100;
    const percentagePerRoom = dynamicPricingPercentage / totalRooms;
    
    return Array.from({ length: totalRooms }, (_, index) => {
      const multiplier = 1 + (percentagePerRoom * index / 100);
      return {
        roomNumber: index + 1,
        price: basePrice * multiplier
      };
    });
  };

  return {
    enableDynamicPricing,
    setEnableDynamicPricing,
    dynamicPricingPercentage,
    setDynamicPricingPercentage,
    calculateExamplePrices
  };
}
