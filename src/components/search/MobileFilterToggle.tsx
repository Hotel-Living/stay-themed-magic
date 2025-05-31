
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import { cn } from "@/lib/utils";

interface MobileFilterToggleProps {
  activeFilters: any;
  handleFilterChange: (filterType: string, value: any) => void;
  handleArrayFilterChange: (filterType: string, value: string, isChecked: boolean) => void;
  onResetAllFilters: () => void;
}

export function MobileFilterToggle({
  activeFilters,
  handleFilterChange,
  handleArrayFilterChange,
  onResetAllFilters
}: MobileFilterToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters & Search Options
        </Button>
      </div>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Filter Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-gradient-to-b from-[#1A1F2C] to-[#2D1B69] shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-purple-800/30">
              <h2 className="text-lg font-semibold text-white">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-fuchsia-500/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-4 overflow-y-auto h-full pb-20">
              <FilterSidebar
                activeFilters={activeFilters}
                handleFilterChange={handleFilterChange}
                handleArrayFilterChange={handleArrayFilterChange}
                onResetAllFilters={() => {
                  onResetAllFilters();
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
