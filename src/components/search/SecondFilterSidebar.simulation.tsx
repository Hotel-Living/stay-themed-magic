
import React from "react";
import { FilterState } from "@/components/filters/FilterTypes";
import { FilterItem } from "./FilterItem";

interface SecondFilterSidebarSimulationProps {
  activeFilters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: any) => void;
  handleArrayFilterChange: (key: keyof FilterState, value: string, isSelected: boolean) => void;
  onResetAllFilters: () => void;
}

export function SecondFilterSidebarSimulation({ 
  activeFilters, 
  handleFilterChange, 
  onResetAllFilters 
}: SecondFilterSidebarSimulationProps) {
  
  // FIXED PRICE RANGES - EXACTLY AS REQUESTED
  const priceRanges = [
    { value: 1000, label: "Hasta $1.000", min: 0, max: 1000 },
    { value: 1500, label: "$1.000 a $1.500", min: 1000, max: 1500 },
    { value: 2000, label: "$1.500 a $2.000", min: 1500, max: 2000 },
    { value: 999999, label: "Más de $2.000", min: 2000, max: 999999 }
  ];

  const handlePriceClick = (priceValue: number) => {
    const newValue = activeFilters.priceRange === priceValue ? null : priceValue;
    console.log("Price filter clicked:", priceValue, "->", newValue);
    handleFilterChange('priceRange', newValue);
  };

  const hasActiveFilters = activeFilters.priceRange !== null && activeFilters.priceRange !== undefined;

  return (
    <div className="bg-fuchsia-950/50 backdrop-blur-md rounded-lg p-4 border border-fuchsia-500/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">FILTERS - DEMO MODE</h2>
        {hasActiveFilters && (
          <button 
            onClick={onResetAllFilters}
            className="text-xs text-fuchsia-300 hover:text-white underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* PRICE FILTER ONLY */}
      <FilterItem title="PRECIO POR MES">
        {priceRanges.map(range => (
          <label key={range.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="checkbox" 
              checked={activeFilters.priceRange === range.value}
              onChange={() => handlePriceClick(range.value)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm font-bold text-white">{range.label}</span>
          </label>
        ))}
      </FilterItem>

      {/* DEBUG INFO */}
      <div className="mt-6 p-3 bg-gray-800/50 rounded text-xs text-gray-400">
        <div className="font-bold mb-1">DEBUG INFO:</div>
        <div>Active Price: {activeFilters.priceRange || 'None'}</div>
        <div>Has Filters: {hasActiveFilters ? 'Yes' : 'No'}</div>
      </div>

      {/* TEMPORARILY DISABLED FILTERS */}
      <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
        <div className="text-yellow-300 text-xs font-bold mb-1">TEMPORARILY DISABLED:</div>
        <div className="text-yellow-200 text-xs">
          • Country Filter<br/>
          • Affinity Filter<br/>
          • Meal Plan Filter<br/>
          • Stars Filter<br/>
          • Activities Filter
        </div>
        <div className="text-yellow-400 text-xs mt-2 italic">
          These will be restored one by one after price filter is confirmed working.
        </div>
      </div>
    </div>
  );
}
