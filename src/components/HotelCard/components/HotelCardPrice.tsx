
import React from "react";
import { formatCurrency } from "@/utils/dynamicPricing";
import { parseRatesData } from "../utils/ratesParser";

interface HotelCardPriceProps {
  rates?: Record<string, number>;
  pricePerMonth?: number;
  currency: string;
}

export const HotelCardPrice: React.FC<HotelCardPriceProps> = ({
  rates,
  pricePerMonth,
  currency = "EUR"
}) => {
  // Helper function to display rates in the desired format
  const displayRates = () => {
    if (!rates) {
      // If no rates defined, use the old pricePerMonth
      return pricePerMonth ? `From ${formatCurrency(pricePerMonth, currency)} per month` : "Price on request";
    }

    const parsedRates = parseRatesData(rates);
    const stayLengths = ["8", "16", "24", "32"];
    const availableRates = stayLengths.filter(length => parsedRates[length]);
    
    if (availableRates.length === 0) {
      // If no rates defined in the new format, use the old pricePerMonth
      return pricePerMonth ? `From ${formatCurrency(pricePerMonth, currency)} per month` : "Price on request";
    }
    
    // Start with the lowest stay length that has a rate
    const lowestStayLength = availableRates.sort((a, b) => Number(a) - Number(b))[0];
    const lowestRate = parsedRates[lowestStayLength];
    
    if (availableRates.length === 1) {
      return `From ${formatCurrency(lowestRate, currency)} per month`;
    }
    
    // Show the starting price with monthly format
    return `From ${formatCurrency(lowestRate, currency)} per month`;
  };

  const formatPriceDisplay = () => {
    const fullPrice = displayRates();
    
    if (fullPrice === "Price on request") {
      return {
        price: "Price on request",
        suffix: ""
      };
    }
    
    // Split the price from "per month"
    const parts = fullPrice.split(' per month');
    return {
      price: parts[0], // e.g., "From €1,320.00"
      suffix: "per month"
    };
  };

  const { price, suffix } = formatPriceDisplay();

  return (
    <div className="text-center text-white">
      <div className="text-lg font-bold">
        {price}
      </div>
      {suffix && (
        <div className="text-sm text-white/90 mt-1">
          {suffix}
        </div>
      )}
    </div>
  );
};
