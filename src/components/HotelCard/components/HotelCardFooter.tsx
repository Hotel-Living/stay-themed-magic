
import React from "react";
import { HotelCardPrice } from "./HotelCardPrice";

interface HotelCardFooterProps {
  rates: Record<string, number>;
  pricePerMonth?: number;
  currency: string;
  availableMonths: string[];
}

export const HotelCardFooter: React.FC<HotelCardFooterProps> = ({
  rates,
  pricePerMonth,
  currency,
  availableMonths
}) => {
  return (
    <div className="mt-3 pt-2 border-t border-gray-700/20 flex justify-between items-center">
      <HotelCardPrice 
        rates={rates}
        pricePerMonth={pricePerMonth}
        currency={currency}
      />
      
      {availableMonths && availableMonths.length > 0 && (
        <div className="text-xs text-fuchsia-400">{availableMonths.length} months available</div>
      )}
    </div>
  );
};
