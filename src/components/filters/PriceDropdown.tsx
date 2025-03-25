
import { FilterDropdownProps } from "./FilterTypes";
import { FilterDropdown } from "./FilterDropdown";
import React from "react";

interface PriceDropdownProps extends Omit<FilterDropdownProps, 'label' | 'value'> {
  value: number | null;
  onSelect: (value: number) => void;
  priceRef: React.RefObject<HTMLDivElement>;
}

export function PriceDropdown({
  value,
  placeholder,
  isOpen,
  toggleDropdown,
  clearFilter,
  filterBgColor,
  compactSpacing,
  useBoldLabels,
  onSelect,
  priceRef
}: PriceDropdownProps) {
  const priceRanges = [
    { value: 1000, label: "Up to 1.000 $" },
    { value: 1500, label: "1.000 $ to 1.500 $" },
    { value: 2000, label: "1.500 $ to 2.000 $" },
    { value: 3000, label: "More than 2.000 $" }
  ];

  const label = priceRanges.find(p => p.value === value)?.label || `$${value}`;

  return (
    <FilterDropdown
      label={label}
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
