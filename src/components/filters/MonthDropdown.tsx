
import { FilterDropdownProps } from "./FilterTypes";
import { FilterDropdown } from "./FilterDropdown";
import React from "react";

interface MonthDropdownProps {
  value: string | null;
  placeholder: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  filterBgColor: string;
  compactSpacing: boolean;
  useBoldLabels: boolean;
  monthRef: React.RefObject<HTMLDivElement>;
  onSelect: (value: string) => void;
  closeDropdown: () => void;
}

export function MonthDropdown({
  value,
  placeholder,
  isOpen,
  toggleDropdown,
  filterBgColor,
  compactSpacing,
  useBoldLabels,
  monthRef,
  onSelect,
  closeDropdown
}: MonthDropdownProps) {
  const months = [
    "january", "february", "march", "april", "may", "june", 
    "july", "august", "september", "october", "november", "december"
  ];
  
  const clearFilter = () => {
    onSelect(""); // This will effectively clear the filter
    closeDropdown();
  };

  return (
    <FilterDropdown
      label={value ? value.charAt(0).toUpperCase() + value.slice(1) : ""}
      value={value}
      placeholder={placeholder}
      isOpen={isOpen}
      toggleDropdown={toggleDropdown}
      clearFilter={clearFilter}
      filterBgColor={filterBgColor}
      compactSpacing={compactSpacing}
      useBoldLabels={useBoldLabels}
      dropdownRef={monthRef}
    >
      <div className="grid grid-cols-2">
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onSelect(month)}
            className={`text-left px-3 py-2 rounded-md text-sm transition-colors capitalize ${
              value === month
                ? "bg-fuchsia-500/20 text-white"
                : "hover:bg-fuchsia-900/40"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </FilterDropdown>
  );
}
