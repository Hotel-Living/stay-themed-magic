
import { FilterDropdownProps } from "./FilterTypes";
import { FilterDropdown } from "./FilterDropdown";
import React from "react";

interface CountryDropdownProps extends Omit<FilterDropdownProps, 'label' | 'value'> {
  value: string | null;
  onSelect: (value: string) => void;
  countryRef: React.RefObject<HTMLDivElement>;
}

export function CountryDropdown({
  value,
  placeholder,
  isOpen,
  toggleDropdown,
  clearFilter,
  filterBgColor,
  compactSpacing,
  useBoldLabels,
  onSelect,
  countryRef
}: CountryDropdownProps) {
  const availableCountries = [
    { value: "spain", label: "Spain 🇪🇸" },
    { value: "france", label: "France 🇫🇷" },
    { value: "italy", label: "Italy 🇮🇹" },
    { value: "usa", label: "USA 🇺🇸" },
    { value: "egypt", label: "Egypt 🇪🇬" },
    { value: "turkey", label: "Turkey 🇹🇷" }
  ];

  const label = value ? availableCountries.find(c => c.value === value)?.label || value : "";

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
      dropdownRef={countryRef}
    >
      {availableCountries.map((country) => (
        <button
          key={country.value}
          onClick={() => onSelect(country.value)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
            value === country.value
              ? "bg-fuchsia-500/20 text-white"
              : "hover:bg-fuchsia-900/40"
          }`}
        >
          {country.label}
        </button>
      ))}
    </FilterDropdown>
  );
}
