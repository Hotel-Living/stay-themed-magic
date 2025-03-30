
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
  renderOptions
}: FilterDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get display label based on type
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
        return options.find((p: any) => p.value === value)?.label || `$${value}`;
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

  useEffect(() => {
    const handleFilterUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: keyof FilterState; value: any }>;
      if (customEvent.detail.key === type) {
        onChange(customEvent.detail.key, customEvent.detail.value);
      }
    };

    const dropdownContainer = dropdownRef.current;
    if (dropdownContainer) {
      dropdownContainer.addEventListener('filter:update', handleFilterUpdate as EventListener);
    }

    return () => {
      if (dropdownContainer) {
        dropdownContainer.removeEventListener('filter:update', handleFilterUpdate as EventListener);
      }
    };
  }, [onChange, type]);

  return (
    <div ref={dropdownRef} className="filter-dropdown relative flex-1 min-w-[160px]">
      <button
        onClick={() => toggleOpen(type)}
        className={`w-full flex items-center justify-between ${filterBgColor} rounded-lg p-3 text-sm hover:bg-fuchsia-900/50 transition-colors ${compactSpacing ? 'py-2' : ''}`}
      >
        <div className="flex items-center">
          {value ? (
            <>
              <span className={`truncate mr-2 ${useBoldLabels ? 'font-semibold' : ''}`}>
                {getDisplayLabel()}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClear(type);
                }}
                className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span className={`text-foreground/70 ${useBoldLabels ? 'font-semibold' : ''}`}>{label}</span>
          )}
        </div>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg bg-fuchsia-950/95 border border-fuchsia-800/30 shadow-xl backdrop-blur-xl z-10 max-h-60 overflow-y-auto">
          {renderOptions(type)}
        </div>
      )}
    </div>
  );
};
