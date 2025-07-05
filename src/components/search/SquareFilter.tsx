import React from "react";
import { cn } from "@/lib/utils";
import { FilterItem } from "./FilterItem";

interface SquareFilterOption {
  value: string;
  label: string;
}

interface SquareFilterProps {
  title: string;
  options: SquareFilterOption[];
  selectedOptions: string[];
  onChange: (value: string, isChecked: boolean) => void;
  loading?: boolean;
  singleSelect?: boolean; // New prop for single-select behavior
}

export function SquareFilter({ 
  title, 
  options, 
  selectedOptions, 
  onChange, 
  loading = false,
  singleSelect = false
}: SquareFilterProps) {

  const handleOptionClick = (optionValue: string) => {
    const isCurrentlySelected = selectedOptions.includes(optionValue);
    
    if (singleSelect) {
      // Single select: clear others and toggle this one
      if (isCurrentlySelected) {
        onChange(optionValue, false); // Deselect
      } else {
        // Deselect any currently selected options first
        selectedOptions.forEach(selected => {
          if (selected !== optionValue) {
            onChange(selected, false);
          }
        });
        onChange(optionValue, true); // Select this one
      }
    } else {
      // Multi-select: normal toggle behavior
      onChange(optionValue, !isCurrentlySelected);
    }
  };
  
  if (loading) {
    return (
      <FilterItem title={title}>
        <div className="text-center text-sm text-fuchsia-300/60 py-2">
          Loading options...
        </div>
      </FilterItem>
    );
  }

  if (options.length === 0) {
    return (
      <FilterItem title={title}>
        <div className="text-center text-sm text-fuchsia-300/60 py-2">
          No options available
        </div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title={title}>
      <div className="space-y-1">
        {options.map(option => {
          const isSelected = selectedOptions.includes(option.value);
          
          return (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                isSelected
                  ? "bg-fuchsia-700/60 text-white font-medium"
                  : "hover:bg-fuchsia-900/40 text-white"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </FilterItem>
  );
}