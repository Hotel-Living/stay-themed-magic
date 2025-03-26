
import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";
import { ReactNode } from "react";
import { FilterDropdownProps } from "./FilterTypes";

interface FilterDropdownExtendedProps extends FilterDropdownProps {
  children: ReactNode;
  className?: string;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export function FilterDropdown({
  label,
  value,
  placeholder,
  isOpen,
  toggleDropdown,
  clearFilter,
  filterBgColor,
  compactSpacing = false,
  useBoldLabels = false,
  children,
  className,
  dropdownRef
}: FilterDropdownExtendedProps) {
  return (
    <div ref={dropdownRef} className={`filter-dropdown relative flex-1 min-w-[160px] ${className || ""}`}>
      <button
        onClick={toggleDropdown}
        className={`w-full flex items-center justify-between ${filterBgColor} rounded-lg p-3 text-sm hover:bg-fuchsia-900/50 transition-colors ${compactSpacing ? 'py-2' : ''}`}
      >
        <div className="flex items-center">
          {value ? (
            <>
              <span className={`truncate mr-2 ${useBoldLabels ? 'font-semibold' : ''}`}>
                {label}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter();
                }}
                className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span className={`text-foreground/70 ${useBoldLabels ? 'font-semibold' : ''}`}>{placeholder}</span>
          )}
        </div>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180" : "")} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg bg-fuchsia-950/95 border border-fuchsia-800/30 shadow-xl backdrop-blur-xl z-10">
          {children}
        </div>
      )}
    </div>
  );
}
