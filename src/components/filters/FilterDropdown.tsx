
import React, { useRef } from "react";
import { ChevronDown, X } from "lucide-react";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterDropdownProps {
  type: string;
  label: string;
  value: any;
  options: any[];
  onChange: (key: string, value: any) => void;
  onClear: (key: string) => void;
  isOpen: boolean;
  toggleOpen: (dropdown: string) => void;
  filterBgColor: string;
  compactSpacing: boolean;
  useBoldLabels: boolean;
  useLargerMobileText: boolean;
  renderOptions: (type: string, extraProps?: any) => React.ReactNode;
  textColor: string;
  labelTextSize?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
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
  useLargerMobileText,
  renderOptions,
  textColor,
  labelTextSize = "text-sm"
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useOnClickOutside(dropdownRef, () => {
    if (isOpen) {
      toggleOpen(type);
    }
  });

  // Function to display the value properly, handling different formats
  const displayValue = () => {
    if (!value) return label;
    
    if (typeof value === 'object' && value.name) {
      return value.name;
    }
    
    return value;
  };

  return (
    <div 
      ref={dropdownRef} 
      className={`relative ${compactSpacing ? "py-1" : "py-2"} flex-1 min-w-[120px]`}
    >
      <button 
        className={`
          flex items-center justify-between w-full rounded-md border border-transparent 
          ${filterBgColor} ${compactSpacing ? "px-2 py-1" : "px-3 py-2"} 
          transition-colors hover:bg-fuchsia-950/60
        `}
        style={{
          backgroundImage: "url('/lovable-uploads/2626de45-cd10-455a-b822-be73d17a335b.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        onClick={() => toggleOpen(type)}
      >
        <span 
          className={`
            ${labelTextSize}
            ${useBoldLabels ? "font-bold" : ""} 
            ${value ? "text-white" : `text-[#860493]`}
            uppercase
          `}
        >
          {displayValue()}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClear(type);
              }} 
              className="text-white/70 hover:text-white"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          <ChevronDown 
            className={`h-4 w-4 transition-transform text-[#860493] ${isOpen ? "transform rotate-180" : ""}`} 
          />
        </div>
      </button>
      
      {isOpen && (
        <div 
          className={`
            absolute z-50 top-full left-0 w-full mt-1 bg-fuchsia-950 
            border border-fuchsia-900/30 rounded-md shadow-lg overflow-hidden
            max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-fuchsia-800
          `}
        >
          {renderOptions(type)}
        </div>
      )}
    </div>
  );
};
