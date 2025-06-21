
import React from "react";
import { formatCurrency } from "@/utils/dynamicPricing";
import { parseRatesData } from "../utils/ratesParser";

interface HotelCardPriceProps {
  rates: Record<string, number>;
  pricePerMonth?: number;
  currency: string;
}

export const HotelCardPrice: React.FC<HotelCardPriceProps> = ({
  rates,
  pricePerMonth,
  currency
}) => {
  // Helper function to display rates in the desired format
  const displayRates = () => {
    const parsedRates = parseRatesData(rates);
    const stayLengths = ["8", "16", "24", "32"];
    const availableRates = stayLengths.filter(length => parsedRates[length]);
    
    if (availableRates.length === 0) {
      // If no rates defined in the new format, use the old pricePerMonth
      return pricePerMonth ? `From ${formatCurrency(pricePerMonth, currency)}` : "Price on request";
    }
    
    // Start with the lowest stay length that has a rate
    const lowestStayLength = availableRates.sort((a, b) => Number(a) - Number(b))[0];
    const lowestRate = parsedRates[lowestStayLength];
    
    if (availableRates.length === 1) {
      return `From ${formatCurrency(lowestRate, currency)} (${lowestStayLength} days)`;
    }
    
    // Show the starting price with shortest duration
    return `From ${formatCurrency(lowestRate, currency)} (${lowestStayLength} days)`;
  };

  return (
    <div className="text-sm font-medium text-white">
      {displayRates()}
    </div>
  );
};
