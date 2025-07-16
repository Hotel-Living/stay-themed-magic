
import React from "react";
import { FilterState } from "../FilterTypes";
import { priceRanges } from "../FilterUtils";
import { useTranslation } from "@/hooks/useTranslation";

interface PriceOptionsProps {
  type: keyof FilterState;
  fontSize: string;
}

export const PriceOptions: React.FC<PriceOptionsProps> = ({ type, fontSize }) => {
  const { t } = useTranslation('filters');
  
  const handlePriceSelection = (priceRange: typeof priceRanges[0]) => {
    let minPrice = 0;
    let maxPrice = priceRange.value;
    
    // Set min/max based on the price range
    if (priceRange.value === 1000) {
      // "Up to $1,000"
      minPrice = 0;
      maxPrice = 1000;
    } else if (priceRange.value === 1500) {
      // "$1,000 - $1,500"
      minPrice = 1000;
      maxPrice = 1500;
    } else if (priceRange.value === 2000) {
      // "$1,500 - $2,000"
      minPrice = 1500;
      maxPrice = 2000;
    } else if (priceRange.value === 3000) {
      // "More than $2,000"
      minPrice = 2000;
      maxPrice = 999999; // Set very high max for "more than" ranges
    }
    
    console.log(`💰 Price range selected: ${minPrice} - ${maxPrice}`);
    
    // Dispatch both minPrice and maxPrice filters
    document.dispatchEvent(new CustomEvent('updateFilter', { 
      detail: { key: 'minPrice', value: minPrice } 
    }));
    document.dispatchEvent(new CustomEvent('updateFilter', { 
      detail: { key: 'maxPrice', value: maxPrice } 
    }));
    
    // Also set priceRange for UI display purposes
    document.dispatchEvent(new CustomEvent('updateFilter', { 
      detail: { key: type, value: priceRange.value } 
    }));
  };
  
  return (
    <>
      {priceRanges.map((price) => (
        <button
          key={price.value}
          onClick={() => handlePriceSelection(price)}
          className={`w-full text-left px-3 py-2 rounded-md ${fontSize} font-bold transition-colors hover:bg-[#460F54]`}
        >
          {t(price.translationKey.replace('filters.', ''))}
        </button>
      ))}
    </>
  );
};
