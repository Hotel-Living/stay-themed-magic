
import React, { useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterState } from "./FilterTypes";

interface FilterDropdownProps {
  type: keyof FilterState;
  label: string;
  value: any;
  options: any[];
  onChange: (key: keyof FilterState, value: any) => void;
  onClear: (key: keyof FilterState) => void;
  isOpen: boolean;
  toggleOpen: (type: string) => void;
  filterBgColor: string;
  compactSpacing: boolean;
  useBoldLabels: boolean;
  useLargerMobileText?: boolean;
  renderOptions: (type: keyof FilterState, props?: any) => React.ReactNode;
}

export const FilterDropdown = ({
  type,
  label,
  value,
  options,
  onChange,
  onClear,
  isOpen,
  toggleOpen,
  filterBgColor,
  compactSpacing,
  useBoldLabels,
  useLargerMobileText = false,
  renderOptions
}: FilterDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const getDisplayLabel = () => {
    if (!value) return null;
    
    switch (type) {
      case 'country':
        return options.find((c: any) => c.value === value)?.label || value;
      case 'month':
        return value.charAt(0).toUpperCase() + value.slice(1);
      case 'theme':
        return value.name;
      case 'priceRange':
        if (typeof value === 'object' && value !== null) {
          return `$${value.min} - $${value.max}`;
        }
        const priceOption = options.find((p: any) => p.value === value);
        return priceOption ? priceOption.label : `$${value}`;
      default:
        return value;
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        toggleOpen("");
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleOpen]);

  // Event handler for filter options
  const handleOptionSelect = (value: any) => {
    onChange(type, value);
    toggleOpen(""); // Close dropdown after selection
  };

  const handleToggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleOpen(type);
  };

  const handleClearClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClear(type);
  };

  const labelFontSize = useLargerMobileText ? 'text-base' : 'text-sm';
  const optionFontSize = useLargerMobileText ? 'text-base' : 'text-sm';

  return (
    <div ref={dropdownRef} className="filter-dropdown-container relative flex-1 min-w-[160px]" onClick={e => e.stopPropagation()}>
      <button
        onClick={handleToggleOpen}
        className={`w-full flex items-center justify-between ${filterBgColor} rounded-lg p-1.5 ${labelFontSize} hover:bg-[#460F54] transition-colors ${compactSpacing ? 'py-1' : ''} shadow-inner border-2 border-white`}
      >
        <div className="flex items-center">
          {value ? (
            <>
              <span className="truncate mr-2 font-bold">
                {getDisplayLabel()}
              </span>
              <button
                onClick={handleClearClick}
                className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span className={`text-foreground/70 ${useBoldLabels ? 'font-bold' : ''}`}>{label}</span>
          )}
        </div>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg bg-fuchsia-950/95 border-2 border-white shadow-xl backdrop-blur-xl z-10 max-h-[350px] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="space-y-1">
            {type === "country" && options.map((country) => (
              <button
                key={country.value}
                onClick={() => handleOptionSelect(country.value)}
                className={`w-full text-left px-3 py-2 rounded-md ${optionFontSize} font-bold transition-colors hover:bg-[#460F54]`}
              >
                {country.label}
              </button>
            ))}

            {type === "month" && options.map((month) => (
              <button
                key={month}
                onClick={() => handleOptionSelect(month)}
                className={`text-left px-3 py-2 rounded-md ${optionFontSize} font-bold transition-colors capitalize hover:bg-[#460F54]`}
              >
                {month}
              </button>
            ))}

            {type === "theme" && (
              <div className="grid grid-cols-1">
                {type === "theme" && renderOptions(type)}
              </div>
            )}

            {type === "priceRange" && options.map((price) => (
              <button
                key={price.value}
                onClick={() => handleOptionSelect(price.value)}
                className={`w-full text-left px-3 py-2 rounded-md ${optionFontSize} font-bold transition-colors hover:bg-[#460F54]`}
              >
                {price.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
