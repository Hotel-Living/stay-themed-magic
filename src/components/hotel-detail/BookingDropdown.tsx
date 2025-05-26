
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PricingMatrixItem {
  roomType: string;
  stayLength: string;
  mealPlan: string;
  price: number;
}

interface BookingDropdownProps {
  pricingMatrix?: PricingMatrixItem[];
  onSelect?: (selection: PricingMatrixItem) => void;
}

export default function BookingDropdown({ pricingMatrix = [], onSelect }: BookingDropdownProps) {
  const formatDropdownOption = (item: PricingMatrixItem) => {
    // Format room type: "double" -> "Double Room"
    const formattedRoomType = item.roomType.charAt(0).toUpperCase() + item.roomType.slice(1);
    const roomTypeDisplay = formattedRoomType.includes('Room') ? formattedRoomType : `${formattedRoomType} Room`;
    
    // Format meal plan: "breakfast" -> "Breakfast"
    const formattedMealPlan = item.mealPlan.charAt(0).toUpperCase() + item.mealPlan.slice(1);
    
    return `${roomTypeDisplay} – ${item.stayLength} nights – ${formattedMealPlan} – ${item.price}`;
  };

  const handleSelectionChange = (value: string) => {
    const selectedItem = pricingMatrix.find(item => formatDropdownOption(item) === value);
    if (selectedItem && onSelect) {
      onSelect(selectedItem);
    }
  };

  // Sort pricing matrix by price (cheapest first)
  const sortedPricingMatrix = [...pricingMatrix].sort((a, b) => a.price - b.price);

  return (
    <Select onValueChange={handleSelectionChange}>
      <SelectTrigger className="w-full bg-fuchsia-950/30 border border-fuchsia-800/30 text-white">
        <SelectValue placeholder="Select room and pricing option" />
      </SelectTrigger>
      <SelectContent className="bg-[#860493] border border-fuchsia-800/30 z-50">
        {sortedPricingMatrix.map((item, index) => {
          const optionValue = formatDropdownOption(item);
          return (
            <SelectItem 
              key={`${item.roomType}-${item.stayLength}-${item.mealPlan}-${index}`}
              value={optionValue}
              className="text-white hover:bg-fuchsia-700/50 focus:bg-fuchsia-700/50 data-[state=checked]:bg-fuchsia-700/50 focus:text-white cursor-pointer"
            >
              {optionValue}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
