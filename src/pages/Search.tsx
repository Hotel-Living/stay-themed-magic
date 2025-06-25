
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SecondFilterSidebar } from "@/components/search/SecondFilterSidebar";
import { SearchResults } from "@/components/search/SearchResults";
import { useHotels } from "@/hooks/useHotels";
import { FilterState } from "@/components/filters/FilterTypes";
import { createDefaultFilters } from "@/utils/filterUtils";

export default function Search() {
  const [activeFilters, setActiveFilters] = useState<FilterState>(createDefaultFilters());
  
  const { hotels, loading, error, updateFilters } = useHotels({
    initialFilters: activeFilters
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleArrayFilterChange = (key: keyof FilterState, value: string, isSelected: boolean) => {
    const currentArray = activeFilters[key] as string[] || [];
    let newArray: string[];
    
    if (isSelected) {
      newArray = [...currentArray, value];
    } else {
      newArray = currentArray.filter(item => item !== value);
    }
    
    const newFilters = { ...activeFilters, [key]: newArray };
    setActiveFilters(newFilters);
    updateFilters(newFilters);
  };

  const onResetAllFilters = () => {
    const defaultFilters = createDefaultFilters();
    setActiveFilters(defaultFilters);
    updateFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* First Filter Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar
                activeFilters={activeFilters}
                handleFilterChange={handleFilterChange}
                handleArrayFilterChange={handleArrayFilterChange}
                onResetAllFilters={onResetAllFilters}
              />
            </div>
            
            {/* Second Filter Sidebar */}
            <div className="lg:col-span-1">
              <SecondFilterSidebar
                activeFilters={activeFilters}
                handleFilterChange={handleFilterChange}
                handleArrayFilterChange={handleArrayFilterChange}
                onResetAllFilters={onResetAllFilters}
              />
            </div>
            
            {/* Search Results */}
            <div className="lg:col-span-2">
              <SearchResults 
                hotels={hotels}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
