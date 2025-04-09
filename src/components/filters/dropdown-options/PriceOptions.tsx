
import React from "react";
import { FilterState } from "../FilterTypes";
import { priceRanges } from "../FilterUtils";

interface PriceOptionsProps {
  type: keyof FilterState;
  fontSize: string;
}

export const PriceOptions: React.FC<PriceOptionsProps> = ({ type, fontSize }) => {
  return (
    <>
      {priceRanges.map((price) => (
        <button
          key={price.value}
          onClick={() => document.dispatchEvent(new CustomEvent('updateFilter', { 
            detail: { key: type, value: price.value } 
          }))}
          className={`w-full text-left px-3 py-2 rounded-md ${fontSize} font-bold transition-colors hover:bg-[#460F54]`}
        >
          {price.label}
        </button>
      ))}
    </>
  );
};
