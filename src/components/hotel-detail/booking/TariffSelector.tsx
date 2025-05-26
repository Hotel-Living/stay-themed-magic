
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTariffOptions } from "./hooks/useTariffOptions";

interface PricingMatrixEntry {
  roomType: string;
  stayLength: string;
  mealPlan: string;
  price: number;
}

interface TariffSelectorProps {
  pricingMatrix?: PricingMatrixEntry[];
  selectedRoomAndPrice: string;
  onTariffChange: (value: string) => void;
}

export function TariffSelector({ 
  pricingMatrix, 
  selectedRoomAndPrice, 
  onTariffChange 
}: TariffSelectorProps) {
  const tariffOptions = useTariffOptions(pricingMatrix);

  return (
    <div>
      <Select value={selectedRoomAndPrice} onValueChange={onTariffChange}>
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
  );
}
