
import { FilterDropdownProps, PriceRangeType } from "./FilterTypes";
import { FilterDropdown } from "./FilterDropdown";
import React from "react";

interface PriceDropdownProps {
  value: PriceRangeType | null;
  placeholder: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  filterBgColor: string;
  compactSpacing: boolean;
  useBoldLabels: boolean;
  priceRef: React.RefObject<HTMLDivElement>;
  onSelect: (value: PriceRangeType) => void;
  closeDropdown: () => void;
}

export function PriceDropdown({
  value,
  placeholder,
  isOpen,
  toggleDropdown,
  filterBgColor,
  compactSpacing,
  useBoldLabels,
  priceRef,
  onSelect,
  closeDropdown
}: PriceDropdownProps) {
  const priceRanges = [
    { value: 1000, label: "Up to 1.000 $" },
    { value: 1500, label: "1.000 $ to 1.500 $" },
    { value: 2000, label: "1.500 $ to 2.000 $" },
    { value: 3000, label: "More than 2.000 $" }
  ];
  
  const clearFilter = () => {
    onSelect(null as any); // This will effectively clear the filter
    closeDropdown();
  };

  const getLabel = () => {
    const foundPrice = priceRanges.find(p => p.value === (typeof value === 'string' ? parseInt(value) : value));
    return foundPrice?.label || (value ? `$${value}` : "");
  };

  return (
    <FilterDropdown
      label={getLabel()}
      value={value}
      placeholder={placeholder}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      clearFilter={clearFilter}
      filterBgColor={filterBgColor}
      compactSpacing={compactSpacing}
      useBoldLabels={useBoldLabels}
      dropdownRef={priceRef}
    >
      {priceRanges.map((price) => (
        <button
          key={price.value}
          onClick={() => onSelect(price.value)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
            value === price.value
              ? "bg-fuchsia-500/20 text-white"
              : "hover:bg-fuchsia-900/40"
          }`}
        >
          {price.label}
        </button>
      ))}
    </FilterDropdown>
  );
}
