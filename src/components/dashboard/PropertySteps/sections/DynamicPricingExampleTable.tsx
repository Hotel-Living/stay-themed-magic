
import React from "react";
import { useCurrency } from "@/context/CurrencyContext";

interface DynamicPricingExampleTableProps {
  examplePrices: Array<{
    roomNumber: number;
    price: number;
  }>;
}

export function DynamicPricingExampleTable({ examplePrices }: DynamicPricingExampleTableProps) {
  const { formatPrice } = useCurrency();

  return (
    <div className="bg-fuchsia-950/40 rounded-lg p-4 border border-fuchsia-800/30">
      <h4 className="text-sm font-medium mb-2">Example: How prices will increase for 10 rooms with a base price of $100</h4>
      <div className="grid grid-cols-5 gap-2 text-xs">
        {examplePrices.map((item) => (
          <div key={item.roomNumber} className="bg-fuchsia-950/30 p-2 rounded text-center">
            <div className="font-medium">Room {item.roomNumber}</div>
            <div>{formatPrice(item.price)}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-fuchsia-300/70 mt-2">
        * Each price is calculated as: Base Price + (Base Price × Percentage Increase ÷ Total Rooms × Rooms Booked)
      </p>
    </div>
  );
}
